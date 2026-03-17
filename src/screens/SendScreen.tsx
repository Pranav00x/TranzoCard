import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';
import { recentContacts } from '../constants/data';

const numpad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

export default function SendScreen({ navigation }: any) {
  const [step, setStep] = useState<'contact' | 'amount'>('contact');
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');

  const handlePress = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (key === 'del') {
      setAmount((p) => p.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount((p) => p + '.');
    } else {
      if (amount.includes('.') && amount.split('.')[1]?.length >= 2) return;
      setAmount((p) => p + key);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (step === 'amount' ? setStep('contact') : navigation.goBack())}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={Colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send</Text>
        <View style={{ width: 42 }} />
      </View>

      {step === 'contact' ? (
        <View style={styles.contactView}>
          {/* Search */}
          <View style={styles.searchBar}>
            <Feather name="user" size={18} color={Colors.muted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter handle or address"
              placeholderTextColor="rgba(107,122,141,0.5)"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="camera" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Recent</Text>
          <FlatList
            data={recentContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactCard}
                activeOpacity={0.85}
                onPress={() => {
                  setSelected(item.name);
                  setStep('amount');
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              >
                <View style={[styles.avatar, { backgroundColor: item.color + '25' }]}>
                  <Text style={[styles.avatarText, { color: item.color }]}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactHandle}>{item.handle}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.amountView}>
          {/* Recipient */}
          <View style={styles.recipientInfo}>
            <Text style={styles.sendingTo}>Sending to</Text>
            <Text style={styles.recipientName}>{selected}</Text>
          </View>

          {/* Amount Display */}
          <View style={styles.amountDisplay}>
            <Text style={styles.amountText}>${amount || '0'}</Text>
          </View>

          {/* Numpad */}
          <View style={styles.numpad}>
            {numpad.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.numKey}
                activeOpacity={0.6}
                onPress={() => handlePress(key)}
              >
                {key === 'del' ? (
                  <Feather name="delete" size={20} color={Colors.foreground} />
                ) : (
                  <Text style={styles.numKeyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Send Button */}
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.8}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              navigation.goBack();
            }}
          >
            <Text style={styles.sendButtonText}>Send ${amount || '0'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: 55,
    gap: Spacing.lg,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.foreground,
    flex: 1,
  },
  contactView: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.lg,
    color: Colors.foreground,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  contactName: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.foreground,
  },
  contactHandle: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  amountView: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  recipientInfo: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  sendingTo: {
    fontSize: FontSize.md,
    color: Colors.muted,
  },
  recipientName: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.primary,
  },
  amountDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 56,
    fontWeight: '800',
    color: Colors.foreground,
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  numKey: {
    width: '30%',
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numKeyText: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.foreground,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    marginBottom: 36,
  },
  sendButtonText: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.background,
  },
});
