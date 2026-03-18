import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize } from '../constants/theme';

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
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName: keyof typeof Feather.glyphMap = 'home';
          let label = 'Home';
          if (route.name === 'Home') { iconName = 'home'; label = 'Home'; }
          else if (route.name === 'EarnTab') { iconName = 'trending-up'; label = 'Earn'; }
          else if (route.name === 'CardTab') { iconName = 'credit-card'; label = 'Card'; }
          else if (route.name === 'RewardsTab') { iconName = 'gift'; label = 'Rewards'; }

          return (
            <View style={styles.tabItem}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconWrapper}>
                <Feather name={iconName} size={22} color={color} />
              </View>
              <Text style={[styles.tabLabel, { color }]}>{label}</Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="EarnTab" component={EarnScreen} />
      <Tab.Screen name="CardTab" component={CardScreen} />
      <Tab.Screen name="RewardsTab" component={RewardsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(15, 23, 34, 0.98)',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingBottom: Platform.OS === 'ios' ? 24 : 6,
    paddingTop: 10,
    paddingHorizontal: 4,
    position: 'absolute',
    elevation: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    position: 'relative',
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 28,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.primary,
  },
});
