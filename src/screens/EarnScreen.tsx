import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';
import { vaults } from '../constants/data';

export default function EarnScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earn</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Feather name="info" size={18} color={Colors.muted} />
        </TouchableOpacity>
      </View>

      {/* How it works */}
      <View style={styles.infoCard}>
        <View style={styles.infoGlow} />
        <Text style={styles.infoTitle}>How does it work?</Text>
        <Text style={styles.infoText}>
          After you deposit, Tranzo automatically allocates your assets across
          top DeFi protocols like lending, staking, and liquidity pools.
          You just earn yield.
        </Text>
      </View>

      {/* Vaults */}
      {vaults.map((vault) => (
        <TouchableOpacity key={vault.id} style={styles.vaultCard} activeOpacity={0.85}>
          <View style={styles.vaultHeader}>
            <View style={styles.vaultLeft}>
              <View style={[styles.vaultIcon, { backgroundColor: vault.color + '20' }]}>
                <Text style={[styles.vaultSymbol, { color: vault.color }]}>{vault.symbol}</Text>
              </View>
              <Text style={styles.vaultAsset}>{vault.asset}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={Colors.muted} />
          </View>

          <View style={styles.vaultStats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>BALANCE</Text>
              <Text style={styles.statValue}>{vault.balance}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>MAX APY</Text>
              <Text style={[styles.statValue, { color: Colors.primary }]}>{vault.apy}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>ASSETS</Text>
              <Text style={styles.statValue}>{vault.tvl}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

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
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    overflow: 'hidden',
  },
  infoGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,229,160,0.04)',
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: FontSize.md,
    color: Colors.muted,
    lineHeight: 22,
  },
  vaultCard: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
  },
  vaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  vaultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  vaultIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaultSymbol: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  vaultAsset: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  vaultStats: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
});
