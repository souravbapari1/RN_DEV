
# 🚀 StarterApp

A modern React Native application built with TypeScript, featuring type-safe navigation, query management, and over-the-air updates.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)
- [Navigation](#-navigation-typing-with-react-navigation--typescript)
- [Over-the-Air Updates](#-over-the-air-updates)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Features

- 🎯 **Type-safe Navigation** with React Navigation & TypeScript
- 🔄 **State Management** with TanStack Query (React Query)
- 🎨 **Custom Boot Splash** with react-native-bootsplash
- 📊 **Charts & Visualizations** with react-native-gifted-charts
- 🗺️ **Maps Integration** with react-native-maps
- 🔄 **Over-the-Air Updates** for instant app updates
- 📱 **Cross-platform** support (iOS & Android)
- 🎭 **Animations** with Reanimated
- 🏠 **Bottom Sheet** UI components

## 🛠 Tech Stack

- **Framework**: React Native 0.76.9
- **Language**: TypeScript
- **Navigation**: React Navigation 7.x
- **State Management**: TanStack Query 5.x
- **Animations**: React Native Reanimated 3.x
- **Icons**: Lucide React Native
- **Charts**: React Native Gifted Charts
- **Maps**: React Native Maps
- **Storage**: AsyncStorage

## ⚡ Quick Start

### Prerequisites

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd StarterApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run assets` | Generate asset files |

### Android Development

```bash
# Build debug APK
npm run android:build-debug

# Install debug APK
npm run android:install-debug

# Build release APK
npm run android:build

# Build AAB (for Play Store)
npm run android:aab

# Clean build
npm run android:clean
```

## 📦 Build & Deploy

### Generate Boot Splash

```bash
npx react-native-bootsplash generate svgs/logo.svg --platforms=android,ios,web --background=FFFFFF --logo-width=130 --assets-output=assets/bootsplash --flavor=main --html=public/index.html
```

### Export Bundles

```bash
# Export Android bundle
npm run export-android

# Export iOS bundle
npm run export-ios
```

## 🧭 Navigation Typing with React Navigation & TypeScript

Enable **type-safe navigation** in your React Native app:

### ✅ Step 1: Define Your Stack Routes

```ts
// types/routes.ts
export type StackParamList = {
  HOME: undefined;
  DETAILS: {id: string};
  PROFILE: {userId: number};
};

export const ROUTES = {
  TABS: {
    HOME: 'HOME',
    DETAILS: 'DETAILS',
    PROFILE: 'PROFILE',
  },
} as const;
```

### ✅ Step 2: Create a Navigation Type Alias

```ts
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList, ROUTES} from '../../types/routes';

// 🔹 Define a type-safe navigation type
type Nav = NativeStackNavigationProp<StackParamList, typeof ROUTES.TABS.HOME>;
```

### ✅ Step 3: Use It with `useNavigation`

```tsx
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation<Nav>();

// Navigate with type safety
navigation.navigate(ROUTES.TABS.DETAILS, {id: '123'});
```

### ✅ Alternative: Screen Props Typing

```ts
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;

export default function HomeScreen({navigation}: Props) {
  navigation.navigate(ROUTES.TABS.PROFILE, {userId: 42});
}
```

## 🔄 Over-the-Air Updates

Implement instant app updates without app store deployment:

```typescript
import hotUpdate from 'react-native-ota-hot-update';
import ReactNativeBlobUtil from 'react-native-blob-util';

hotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
  updateSuccess: () => {
    console.log('Update successful!');
  },
  updateFail(message?: string) {
    Alert.alert('Update failed!', message, [
      {
        text: 'Cancel',
        onPress: () => console.log('Update cancelled'),
        style: 'cancel',
      },
    ]);
  },
  restartAfterInstall: true,
});
```

## 📁 Project Structure

```
StarterApp/
├── src/
│   ├── main.tsx              # Main app component
│   ├── config/               # App configuration
│   ├── constants/            # App constants
│   │   └── assets.ts         # Asset constants
│   ├── lib/                  # Utility libraries
│   └── screens/              # Screen components
├── types/
│   └── routes.d.ts           # Navigation type definitions
├── assets/
│   └── bootsplash/           # Boot splash assets
├── svgs/
│   └── logo.svg              # SVG assets
├── android/                  # Android-specific files
├── ios/                      # iOS-specific files
└── scripts/
    └── assets.js             # Asset generation script
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React Native & TypeScript**


```ts
type Nav = NativeStackNavigationProp<StackParamList, typeof ROUTES.TABS.HOME>;
```

in a React Native app using React Navigation and TypeScript.

---

## 🧭 Navigation Typing with React Navigation & TypeScript

To enable **type-safe navigation** in React Native using React Navigation, define and use a navigation prop type like this:

### ✅ Step 1: Define Your Stack Routes

```ts
// types/routes.ts

export type StackParamList = {
  HOME: undefined;
  DETAILS: {id: string};
  PROFILE: {userId: number};
};

export const ROUTES = {
  TABS: {
    HOME: 'HOME',
    DETAILS: 'DETAILS',
    PROFILE: 'PROFILE',
  },
};
```

---

### ✅ Step 2: Create a Navigation Type Alias

In your screen or component:

```ts
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../types/routes';
import {ROUTES} from '../constants/route';

// 🔹 Define a type-safe navigation type
type Nav = NativeStackNavigationProp<StackParamList, typeof ROUTES.TABS.HOME>;
```

This creates a reusable `Nav` type that lets you navigate from the `HOME` screen with full TypeScript support.

---

### ✅ Step 3: Use It with `useNavigation`

```tsx
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation<Nav>();

// Navigate to another screen
navigation.navigate(ROUTES.TABS.DETAILS, {id: '123'});
```

---

### ✅ Use in Screen Props (Optional Alternative)

If you're inside a screen component, you can also type props directly:

```ts
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;

export default function HomeScreen({navigation}: Props) {
  navigation.navigate(ROUTES.TABS.PROFILE, {userId: 42});
}
```



### OTA Update

```tsx
 import hotUpdate from 'react-native-ota-hot-update';
    import ReactNativeBlobUtil from 'react-native-blob-util';
    
    
    hotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
      updateSuccess: () => {
        console.log('update success!');
      },
      updateFail(message?: string) {
        Alert.alert('Update failed!', message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      },
      restartAfterInstall: true,
    });
```