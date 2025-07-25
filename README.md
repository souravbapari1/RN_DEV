```
npx react-native-bootsplash generate svgs/logo.svg \
  --platforms=android,ios,web \
  --background=FFFFFF \
  --logo-width=130 \
  --assets-output=assets/bootsplash \
  --flavor=main \
  --html=public/index.html


```

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
