import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';

export default function SignupScreen({ navigation }: any) {
  const [step, setStep] = useState<'method' | 'form'>('method');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (step === 'form' ? setStep('method') : navigation.goBack())}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={Colors.foreground} />
        </TouchableOpacity>

        {step === 'method' ? (
          <View style={styles.content}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Choose how you want to sign up</Text>

            <TouchableOpacity
              style={styles.methodCard}
              activeOpacity={0.8}
              onPress={() => { setMethod('email'); setStep('form'); }}
            >
              <View style={[styles.methodIcon, { backgroundColor: 'rgba(0,229,160,0.1)' }]}>
                <Feather name="mail" size={22} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.methodTitle}>Email</Text>
                <Text style={styles.methodSub}>Sign up with your email address</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.methodCard}
              activeOpacity={0.8}
              onPress={() => { setMethod('phone'); setStep('form'); }}
            >
              <View style={[styles.methodIcon, { backgroundColor: 'rgba(0,212,255,0.1)' }]}>
                <Feather name="phone" size={22} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.methodTitle}>Phone</Text>
                <Text style={styles.methodSub}>Sign up with your phone number</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.title}>
              {method === 'email' ? 'Enter your email' : 'Enter your number'}
            </Text>
            <Text style={styles.subtitle}>We&apos;ll send you a verification code</Text>

            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>
                {method === 'email' ? 'Email Address' : 'Phone Number'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={method === 'email' ? 'you@example.com' : '+91 00000 00000'}
                placeholderTextColor="rgba(107,122,141,0.5)"
                value={method === 'email' ? email : phone}
                onChangeText={method === 'email' ? setEmail : setPhone}
                keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Create a strong password"
                  placeholderTextColor="rgba(107,122,141,0.5)"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={Colors.muted}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {step === 'form' && (
        <View style={styles.bottomCta}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  content: {
    marginTop: Spacing.xxxl,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.muted,
    marginBottom: Spacing.xxxl,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  methodSub: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  inputCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginBottom: Spacing.sm,
  },
  input: {
    fontSize: FontSize.xl,
    color: Colors.foreground,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomCta: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: 36,
    paddingTop: Spacing.lg,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  continueText: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.background,
  },
});
