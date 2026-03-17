# Tranzo Card

A crypto-native debit card app that lets you deposit stablecoins and spend anywhere Visa is accepted. Built with React Native + Expo.

## Features

- **Virtual Visa Card** — Spend crypto at 80M+ merchants worldwide
- **Custodial Wallet** — Deposit stablecoins (USDT, USDC), hold ETH/BTC
- **Earn Yield** — Auto-allocate idle funds across DeFi protocols (up to 4.90% APY)
- **Send & Receive** — Instant peer-to-peer transfers via handles
- **TZP Rewards** — Earn points on every transaction, redeem for perks
- **Real-time Spending** — Track card transactions, set limits, lock/unlock instantly

## Tech Stack

- **React Native** + **Expo** (SDK 55)
- **React Navigation** (Bottom Tabs + Native Stack)
- **React Native Reanimated** for smooth 60fps animations
- **Expo Haptics** for tactile feedback
- **TypeScript** throughout

## Screens

| Screen | Description |
|--------|-------------|
| Onboarding | Animated card preview with cycling taglines |
| Signup | Email/phone registration with password |
| Home | Balance, quick actions, earn CTA, transaction feed |
| Card | Virtual Visa card, spending bar, lock/details/limit |
| Earn | DeFi vaults (USD, ETH, EUR, BTC) with APY display |
| Rewards | TZP points, invite code, leaderboard, breakdown |
| Send | Contact picker + custom numpad amount entry |
| Settings | Profile, verification, 2FA, backup, privacy |

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on Android
npx expo start --android
```

## Build APK

```bash
# Generate native android project
npx expo prebuild --platform android

# Build release APK
cd android && ./gradlew assembleRelease
```

APK is also built automatically via GitHub Actions on every push to `main` and sent to Telegram.

## Project Structure

```
src/
├── constants/
│   ├── theme.ts          # Colors, spacing, typography
│   └── data.ts           # Mock data for transactions, vaults, contacts
├── navigation/
│   ├── RootNavigator.tsx  # Stack navigator (onboarding → main)
│   └── TabNavigator.tsx   # Bottom tab navigator
└── screens/
    ├── OnboardingScreen.tsx
    ├── SignupScreen.tsx
    ├── HomeScreen.tsx
    ├── CardScreen.tsx
    ├── EarnScreen.tsx
    ├── RewardsScreen.tsx
    ├── SendScreen.tsx
    └── SettingsScreen.tsx
```

## License

Proprietary — Tranzo Inc.
