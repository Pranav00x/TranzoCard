import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';
import { cardTransactions } from '../constants/data';

const { width } = Dimensions.get('window');

const cardActions = [
  { icon: 'eye' as const, label: 'Show\ndetails' },
  { icon: 'lock' as const, label: 'Lock' },
  { icon: 'sliders' as const, label: 'Change\nlimit' },
];

export default function CardScreen() {
  const cardSlide = useRef(new Animated.Value(-30)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(cardSlide, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
      Animated.timing(cardOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.timing(barWidth, { toValue: 1, duration: 1000, delay: 500, useNativeDriver: false }).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Card */}
      <Animated.View style={[styles.cardWrapper, { opacity: cardOpacity, transform: [{ translateY: cardSlide }] }]}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLogo}>tranzo</Text>
            <Text style={styles.cardVisa}>VISA</Text>
          </View>
          <View>
            <View style={styles.chip} />
            <View style={styles.numberRow}>
              <Text style={styles.dots}>••••</Text>
              <Text style={styles.dots}>••••</Text>
              <Text style={styles.dots}>••••</Text>
              <Text style={[styles.dots, { opacity: 0.5 }]}>4589</Text>
            </View>
            <Text style={styles.cardName}>PRANAV</Text>
          </View>
          <Text style={styles.watermark}>TZ</Text>
        </View>
      </Animated.View>

      {/* Card Actions */}
      <View style={styles.actionsRow}>
        {cardActions.map((action, i) => (
          <TouchableOpacity key={i} style={styles.actionItem} activeOpacity={0.7}>
            <View style={styles.actionCircle}>
              <Feather name={action.icon} size={20} color={Colors.muted} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Spending Bar */}
      <View style={styles.spendingCard}>
        <View style={styles.spendingHeader}>
          <Text style={styles.spendingLabel}>This month's spending</Text>
          <Text style={styles.spendingAmount}>$118.03</Text>
        </View>
        <View style={styles.barBg}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: barWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '24%'],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.barLabels}>
          <Text style={styles.barLabel}>$118 spent</Text>
          <Text style={styles.barLabel}>$500 limit</Text>
        </View>
      </View>

      {/* Transactions */}
      <View style={styles.txSection}>
        <Text style={styles.txTitle}>Recent transactions</Text>
        {cardTransactions.map((tx, i) => (
          <View key={tx.id} style={styles.txCard}>
            <View style={styles.txIcon}>
              <Feather name="arrow-up-right" size={16} color={Colors.danger} />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName}>{tx.name}</Text>
              <Text style={styles.txMeta}>{tx.category} · {tx.time}</Text>
            </View>
            <Text style={styles.txAmount}>-${Math.abs(tx.amount).toFixed(2)}</Text>
          </View>
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
  cardWrapper: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: 55,
  },
  card: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,229,160,0.1)',
    padding: Spacing.xxl,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  cardVisa: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
  },
  chip: {
    width: 46,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(234,179,8,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(234,179,8,0.15)',
    marginBottom: Spacing.lg,
  },
  numberRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: Spacing.sm,
  },
  dots: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 4,
  },
  cardName: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
  },
  watermark: {
    position: 'absolute',
    right: -10,
    bottom: -20,
    fontSize: 130,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.015)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: Spacing.xxl,
  },
  actionItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 11,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 14,
  },
  spendingCard: {
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  spendingLabel: {
    fontSize: FontSize.sm,
    color: Colors.muted,
  },
  spendingAmount: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.foreground,
  },
  barBg: {
    height: 8,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  barLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
  },
  txSection: {
    paddingHorizontal: Spacing.xxl,
  },
  txTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.lg,
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
    backgroundColor: Colors.surfaceLight,
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
  txMeta: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.foreground,
  },
});
