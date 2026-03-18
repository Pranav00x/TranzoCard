import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';
import { mockTransactions } from '../constants/data';

const actions = [
  { icon: 'download' as const, label: 'Add money' },
  { icon: 'send' as const, label: 'Send', nav: 'Send' },
  { icon: 'repeat' as const, label: 'Convert' },
  { icon: 'refresh-cw' as const, label: 'Swap' },
];

export default function HomeScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const balanceScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(balanceScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Feather name="search" size={18} color={Colors.muted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Settings')}
          >
            <Feather name="settings" size={18} color={Colors.muted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance */}
      <Animated.View style={[styles.balanceContainer, { opacity: fadeAnim, transform: [{ scale: balanceScale }] }]}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceCurrency}>$</Text>
          <Text style={styles.balanceAmount}>1,234</Text>
          <Text style={styles.balanceCents}>.56</Text>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View style={[styles.actionsRow, { opacity: fadeAnim }]}>
        {actions.map((action, i) => (
          <TouchableOpacity
            key={i}
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={() => action.nav && navigation.navigate(action.nav)}
          >
            <View style={styles.actionCircle}>
              <Feather name={action.icon} size={20} color={Colors.foreground} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Earn CTA */}
      <TouchableOpacity
        style={styles.earnCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('EarnTab')}
      >
        <View style={styles.earnGlow} />
        <View style={styles.earnContent}>
          <View style={styles.earnIconBox}>
            <Feather name="trending-up" size={22} color={Colors.primary} />
          </View>
          <View style={styles.earnText}>
            <Text style={styles.earnTitle}>
              Earn <Text style={{ color: Colors.primary }}>$49.02</Text> a year
            </Text>
            <Text style={styles.earnSub}>on every $1,000 you have</Text>
          </View>
          <Feather name="arrow-up-right" size={18} color={Colors.primary} />
        </View>
        <View style={styles.earnDivider} />
        <TouchableOpacity style={styles.earnButton} activeOpacity={0.8}>
          <Text style={styles.earnButtonText}>Make your first deposit</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Transactions */}
      <View style={styles.txSection}>
        <View style={styles.txHeader}>
          <Text style={styles.txTitle}>Recent transactions</Text>
          <TouchableOpacity>
            <Text style={styles.txSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {mockTransactions.map((tx, i) => (
          <Animated.View key={tx.id} style={styles.txCard}>
            <View style={[styles.txIcon, { backgroundColor: tx.amount > 0 ? 'rgba(0,229,160,0.1)' : Colors.surfaceLight }]}>
              <Feather
                name={tx.amount > 0 ? 'arrow-down-left' : 'arrow-up-right'}
                size={16}
                color={tx.amount > 0 ? Colors.primary : Colors.danger}
              />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName}>{tx.name}</Text>
              <Text style={styles.txTime}>{tx.time}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.amount > 0 ? Colors.primary : Colors.foreground }]}>
              {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
            </Text>
          </Animated.View>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: 55,
    paddingBottom: Spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  balanceLabel: {
    fontSize: FontSize.md,
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  balanceCurrency: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
  },
  balanceCents: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.muted,
    marginBottom: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    fontWeight: '500',
    textAlign: 'center',
  },
  earnCard: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  earnGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,229,160,0.04)',
  },
  earnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  earnIconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(0,229,160,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnText: {
    flex: 1,
  },
  earnTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  earnSub: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  earnDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xl,
  },
  earnButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  earnButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.background,
  },
  txSection: {
    paddingHorizontal: Spacing.xxl,
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  txTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  txSeeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
  },
  txName: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.foreground,
  },
  txTime: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
});
