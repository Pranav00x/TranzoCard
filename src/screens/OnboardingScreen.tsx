import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSize, Spacing, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');
const words = ['Spend.', 'Earn.', 'Trade.', 'Bank.'];

export default function OnboardingScreen({ navigation }: any) {
  const [activeWord, setActiveWord] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(cardAnim, { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
    ]).start();

    // Shimmer loop
    const shimmerLoop = () => {
      shimmerAnim.setValue(-width);
      Animated.timing(shimmerAnim, {
        toValue: width * 2,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => setTimeout(shimmerLoop, 2000));
    };
    shimmerLoop();

    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openTerms = () => {
    Linking.openURL('https://tranzo.money/terms');
  };

  const openPrivacy = () => {
    Linking.openURL('https://tranzo.money/privacy');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background glow */}
      <View style={styles.bgGlow} />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logo}>tranzo</Text>
      </Animated.View>

      {/* Card */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
          },
        ]}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLogo}>tranzo</Text>
            <Text style={styles.cardVisa}>VISA</Text>
          </View>
          <View style={styles.cardBottom}>
            <View style={styles.chip} />
            <View style={styles.cardNumberRow}>
              <Text style={styles.cardDots}>••••</Text>
              <Text style={styles.cardDots}>••••</Text>
              <Text style={styles.cardDots}>••••</Text>
              <Text style={[styles.cardDots, { opacity: 0.5 }]}>4589</Text>
            </View>
          </View>
          {/* Shimmer */}
          <Animated.View
            style={[
              styles.shimmer,
              { transform: [{ translateX: shimmerAnim }] },
            ]}
          />
          <Text style={styles.cardWatermark}>TZ</Text>
        </View>
      </Animated.View>

      {/* Animated Words */}
      <View style={styles.wordsContainer}>
        {words.map((word, i) => (
          <Text
            key={word}
            style={[
              styles.word,
              { opacity: activeWord === i ? 1 : 0.12 },
            ]}
          >
            {word}
          </Text>
        ))}
      </View>

      {/* CTAs */}
      <Animated.View
        style={[
          styles.ctaContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.secondaryButtonText}>Already have a Tranzo account?</Text>
        </TouchableOpacity>

        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>By continuing, you agree to our</Text>
          <View style={styles.legalLinksRow}>
            <TouchableOpacity onPress={openTerms} activeOpacity={0.7}>
              <Text style={styles.legalLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.legalDivider}>&</Text>
            <TouchableOpacity onPress={openPrivacy} activeOpacity={0.7}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bgGlow: {
    position: 'absolute',
    top: '15%',
    left: '25%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0,229,160,0.04)',
  },
  logoContainer: {
    paddingTop: 60,
    paddingHorizontal: Spacing.xxxl,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  card: {
    width: 280,
    height: 175,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,229,160,0.12)',
    padding: Spacing.xl,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLogo: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.primary,
  },
  cardVisa: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
  },
  cardBottom: {},
  chip: {
    width: 40,
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(234,179,8,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(234,179,8,0.15)',
    marginBottom: Spacing.md,
  },
  cardNumberRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardDots: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 3,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  cardWatermark: {
    position: 'absolute',
    right: -8,
    bottom: -15,
    fontSize: 100,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.02)',
  },
  wordsContainer: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 'auto',
  },
  word: {
    fontSize: 46,
    fontWeight: '900',
    color: Colors.white,
  },
  ctaContainer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: 40,
    gap: Spacing.md,
    alignItems: 'stretch',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.background,
  },
  secondaryButton: {
    backgroundColor: Colors.surfaceLight,
    height: 56,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  legalContainer: {
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  legalText: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginBottom: 4,
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legalLink: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  legalDivider: {
    fontSize: FontSize.xs,
    color: Colors.muted,
  },
});
