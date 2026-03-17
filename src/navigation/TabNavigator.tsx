import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import EarnScreen from '../screens/EarnScreen';
import CardScreen from '../screens/CardScreen';
import RewardsScreen from '../screens/RewardsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, focused }) => {
          let iconName: keyof typeof Feather.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'EarnTab') iconName = 'trending-up';
          else if (route.name === 'CardTab') iconName = 'credit-card';
          else if (route.name === 'RewardsTab') iconName = 'gift';

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <Feather name={iconName} size={22} color={color} strokeWidth={focused ? 2.5 : 1.5} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="EarnTab" component={EarnScreen} options={{ tabBarLabel: 'Earn' }} />
      <Tab.Screen name="CardTab" component={CardScreen} options={{ tabBarLabel: 'Card' }} />
      <Tab.Screen name="RewardsTab" component={RewardsScreen} options={{ tabBarLabel: 'Rewards' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(15, 23, 34, 0.95)',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    paddingTop: 8,
    position: 'absolute',
    elevation: 0,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 32,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
});
