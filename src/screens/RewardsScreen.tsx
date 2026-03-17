import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';

const rewardActions = [
  { icon: 'target' as const, label: 'Get TZPs' },
  { icon: 'users' as const, label: 'Invite\nfriends' },
  { icon: 'award' as const, label: 'Leader-\nboard' },
  { icon: 'arrow-down-circle' as const, label: 'Redeem', disabled: true },
];

export default function RewardsScreen() {
  const copyCode = async () => {
    await Clipboard.setStringAsync('TRNZ7X');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>TZP Balance</Text>
        <View style={styles.balanceRow}>
          <View style={styles.tzpBadge}>
            <Text style={styles.tzpBadgeText}>T</Text>
          </View>
          <Text style={styles.balanceAmount}>0</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        {rewardActions.map((action, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.actionItem, action.disabled && { opacity: 0.4 }]}
            activeOpacity={action.disabled ? 1 : 0.7}
          >
            <View style={styles.actionCircle}>
              <Feather name={action.icon} size={20} color={Colors.secondary} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
            {action.disabled && <Text style={styles.soonBadge}>Soon</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Invite Card */}
      <View style={styles.inviteCard}>
        <View style={styles.inviteGlow} />
        <View style={styles.inviteContent}>
          <View>
            <Text style={styles.inviteLabel}>SHARE YOUR INVITE</Text>
            <View style={styles.codeRow}>
              <Text style={styles.inviteCode}>TRNZ7X</Text>
              <TouchableOpacity onPress={copyCode} activeOpacity={0.7}>
                <Feather name="copy" size={16} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.founderBadge}>
            <Text style={styles.founderText}>Founding{'\n'}Member</Text>
          </View>
        </View>
      </View>

      {/* Breakdown */}
      <View style={styles.breakdownSection}>
        <Text style={styles.breakdownTitle}>Rewards Breakdown</Text>
        <View style={styles.breakdownGrid}>
          {[
            { icon: 'credit-card' as const, label: 'CARD', amount: '0' },
            { icon: 'trending-up' as const, label: 'EARN', amount: '0' },
          ].map((item, i) => (
            <View key={i} style={styles.breakdownCard}>
              <View style={styles.breakdownCardHeader}>
                <View style={styles.breakdownIcon}>
                  <Feather name={item.icon} size={16} color={Colors.secondary} />
                </View>
                <Feather name="arrow-up-right" size={14} color={Colors.muted} />
              </View>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <View style={styles.breakdownAmountRow}>
                <Text style={styles.breakdownAmount}>{item.amount}</Text>
                <View style={styles.tzpSmall}>
                  <Text style={styles.tzpSmallText}>T</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  balanceSection: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: Spacing.xxl,
  },
  balanceLabel: {
    fontSize: FontSize.md,
    color: Colors.muted,
    marginBottom: Spacing.sm,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  tzpBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tzpBadgeText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.foreground,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  actionItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(124,92,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 10,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 14,
  },
  soonBadge: {
    fontSize: 9,
    color: Colors.secondary,
    fontWeight: '600',
    marginTop: -4,
  },
  inviteCard: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    backgroundColor: 'rgba(124,92,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.2)',
    overflow: 'hidden',
  },
  inviteGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(124,92,255,0.08)',
  },
  inviteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteLabel: {
    fontSize: 10,
    color: Colors.secondary,
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  inviteCode: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.foreground,
    letterSpacing: 3,
  },
  founderBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(124,92,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  founderText: {
    fontSize: 10,
    color: Colors.secondary,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  breakdownSection: {
    paddingHorizontal: Spacing.xxl,
  },
  breakdownTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.lg,
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  breakdownCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    backgroundColor: 'rgba(124,92,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(124,92,255,0.15)',
  },
  breakdownCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  breakdownIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(124,92,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    letterSpacing: 1,
  },
  breakdownAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  breakdownAmount: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  tzpSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tzpSmallText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '700',
  },
});
