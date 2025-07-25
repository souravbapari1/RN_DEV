import {
    BottomTabNavigationProp
} from '@react-navigation/bottom-tabs';
import {
    DrawerNavigationProp
} from '@react-navigation/drawer';
import {
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { ROUTES } from '../src/constants/route';


// 🔁 Extract union of values
type ValueOf<T> = T[keyof T];

// ✅ Param lists for each navigator
export type StackParamList = {
    [K in ValueOf<typeof ROUTES.STACK>]: undefined;
};

export type DrawerParamList = {
    [K in ValueOf<typeof ROUTES.DRAWER>]: undefined;
};

export type TabParamList = {
    [K in ValueOf<typeof ROUTES.TABS>]: undefined;
};



// ✅ Optional: NavigationProp helpers (if needed for screens)
export type StackNavProp<T extends keyof StackParamList> = NativeStackNavigationProp<StackParamList, T>;
export type DrawerNavProp<T extends keyof DrawerParamList> = DrawerNavigationProp<DrawerParamList, T>;
export type TabNavProp<T extends keyof TabParamList> = BottomTabNavigationProp<TabParamList, T>;
