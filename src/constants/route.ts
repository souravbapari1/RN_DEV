export const ROUTES = {
    STACK: {
        HOME: 'Home',
        SHEET: 'Sheet',
    },
    DRAWER: {
        TABS: 'Tabs',
        SETTINGS: 'Settings',
    },
    TABS: {
        HOME: 'Home',
        PROFILE: 'Profile',
    },
} as const;


import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';
import { DrawerParamList, StackParamList, TabParamList } from '../../types/routes';

// ✅ Navigators
export const Stack = createNativeStackNavigator<StackParamList>();
export const Drawer = createDrawerNavigator<DrawerParamList>();
export const Tab = createBottomTabNavigator<TabParamList>();