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

const generalItems = [
  { icon: 'at-sign' as const, label: 'Account Handle', badge: 'AVAILABLE', badgeColor: Colors.primary },
  { icon: 'user-check' as const, label: 'Verification', badge: null, badgeColor: '' },
  { icon: 'upload-cloud' as const, label: 'Account Backup', badge: 'SETUP', badgeColor: Colors.danger },
  { icon: 'eye' as const, label: 'Account Privacy', badge: null, badgeColor: '' },
  { icon: 'globe' as const, label: 'Language', badge: null, badgeColor: '' },
];

const securityItems = [
  { icon: 'shield' as const, label: 'Password & 2FA' },
  { icon: 'smartphone' as const, label: 'Authorized Devices' },
];

export default function SettingsScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={Colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>P</Text>
        </View>
        <Text style={styles.profileName}>@pranav</Text>
        <View style={styles.verifiedBadge}>
          <View style={styles.verifiedDot} />
          <Text style={styles.verifiedText}>VERIFIED</Text>
        </View>
        <TouchableOpacity style={styles.receiveButton} activeOpacity={0.8}>
          <Feather name="download" size={16} color={Colors.foreground} />
          <Text style={styles.receiveText}>Receive</Text>
        </TouchableOpacity>
      </View>

      {/* General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.sectionCard}>
          {generalItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i < generalItems.length - 1 && styles.menuBorder]}
              activeOpacity={0.7}
            >
              <Feather name={item.icon} size={18} color={Colors.muted} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={[styles.badge, { backgroundColor: item.badgeColor + '15' }]}>
                  <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                </View>
              )}
              <Feather name="chevron-right" size={16} color={Colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.sectionCard}>
          {securityItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i < securityItems.length - 1 && styles.menuBorder]}
              activeOpacity={0.7}
            >
              <Feather name={item.icon} size={18} color={Colors.muted} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={16} color={Colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Feather name="log-out" size={16} color={Colors.danger} />
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
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
  },
  profileCard: {
    marginHorizontal: Spacing.xxl,
    marginTop: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(0,229,160,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileInitial: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.foreground,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.foreground,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,229,160,0.08)',
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  verifiedText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '500',
  },
  receiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    width: '100%',
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
  },
  receiveText: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.foreground,
  },
  section: {
    paddingHorizontal: Spacing.xxl,
    marginTop: Spacing.xxxl,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.foreground,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.xxl,
    marginTop: Spacing.xxxl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(255,71,87,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,71,87,0.2)',
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.danger,
  },
});
