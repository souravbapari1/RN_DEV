import {NavigationContainer} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import ScreenLoader from './Wrapper/ScreenLoader';
import {NavigationConfig} from './constants/route';
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const SheetScreen = React.lazy(() => import('./screens/SheetScreen'));

export default function MainApp() {
  useLayoutEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <NavigationConfig.Stack.Navigator
        initialRouteName={NavigationConfig.getRoute('STACK.ROOT.HOME')}
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAlign: 'center',
          contentStyle: {backgroundColor: '#fff'},
        }}>
        <NavigationConfig.Stack.Screen
          name={NavigationConfig.getRoute('STACK.ROOT.HOME')}
          children={(props: any) => (
            <ScreenLoader>
              <HomeScreen {...props} />
            </ScreenLoader>
          )}
        />
        <NavigationConfig.Stack.Screen
          name={NavigationConfig.getRoute('STACK.ROOT.SHEET')}
          children={(props: any) => (
            <ScreenLoader>
              <SheetScreen {...props} />
            </ScreenLoader>
          )}
        />
      </NavigationConfig.Stack.Navigator>
    </NavigationContainer>
  );
}
