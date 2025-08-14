// navigation/NavigationConfig.ts
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
    DrawerParamList,
    StackParamList,
    TabParamList,
} from '../../types/routes';

// ------------------------------------
// Helper: Recursively build dot-notation keys
// ------------------------------------
type DotNestedKeys<T, Prefix extends string = ''> = {
    [K in keyof T & string]:
    T[K] extends Record<string, any>
    ? `${Prefix}${K}` | DotNestedKeys<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

// ------------------------------------
// Main Config Class
// ------------------------------------
export class NavigationConfig {
    // Deeply Nested Routes
    static ROUTES = Object.freeze({
        STACK: {
            ROOT: {
                HOME: 'Home',
                SHEET: 'Sheet',
            },
        },
        DRAWER: {
            MAIN: {
                TABS: 'Tabs',
                SETTINGS: 'Settings',
            },
            SUPPORT: {
                HELP: 'Help',
                FEEDBACK: 'Feedback',
            },
        },
        TABS: {
            HOME: {
                ROOT: 'HomeTab',
                FEED: 'FeedTab',
            },
            PROFILE: {
                ROOT: 'ProfileTab',
                EDIT: 'EditProfileTab',
            },
        },
    });

    // All possible dot-path keys
    static ROUTE_KEYS: DotNestedKeys<typeof NavigationConfig.ROUTES>;

    // Navigator instances
    static Stack = createNativeStackNavigator<StackParamList>();
    static Drawer = createDrawerNavigator<DrawerParamList>();
    static Tab = createBottomTabNavigator<TabParamList>();

    // Get route name from dot-path (with TS type safety)
    static getRoute<K extends DotNestedKeys<typeof NavigationConfig.ROUTES>>(
        path: K
    ): string {
        return path.split('.').reduce((acc: any, key) => acc[key], NavigationConfig.ROUTES);
    }
}
