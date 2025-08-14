// src/types/routes.ts
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationConfig } from '../src/constants/route';

// ------------------------------------
// Utility type: Extract all nested string values from an object
// ------------------------------------
type DeepValueOf<T> =
  T extends string
    ? T
    : T extends Record<string, any>
      ? DeepValueOf<T[keyof T]>
      : never;

// ------------------------------------
// Param lists from deep route values (with full autocomplete support)
// ------------------------------------
export type StackParamList = {
  [K in DeepValueOf<typeof NavigationConfig.ROUTES.STACK>]: undefined;
};

export type DrawerParamList = {
  [K in DeepValueOf<typeof NavigationConfig.ROUTES.DRAWER>]: undefined;
};

export type TabParamList = {
  [K in DeepValueOf<typeof NavigationConfig.ROUTES.TABS>]: undefined;
};

// ------------------------------------
// Navigation prop helpers (generic autocomplete for route names)
// ------------------------------------
export type StackNavProp<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type DrawerNavProp<T extends keyof DrawerParamList> =
  DrawerNavigationProp<DrawerParamList, T>;

export type TabNavProp<T extends keyof TabParamList> =
  BottomTabNavigationProp<TabParamList, T>;
