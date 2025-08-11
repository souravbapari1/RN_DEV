import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { Text } from 'react-native-gesture-handler';
import { StackNavProp } from '../types/routes';
import { ROUTES, Stack } from './constants/route';
import ScreenLoader from './Wrapper/ScreenLoader';
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const SheetScreen = React.lazy(() => import('./screens/SheetScreen'));

const HomeHeaderLeft = () => {
  type Navigation = StackNavProp<'Home'>;
  const navigation = useNavigation<Navigation>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.STACK.HOME)}>
      <Text>Go to Sheet</Text>
    </TouchableOpacity>
  );
};

export default function MainApp() {
  useLayoutEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.STACK.HOME}
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          headerTitleAlign: 'center',
          contentStyle: {backgroundColor: '#fff'},
        }}>
        <Stack.Screen
          name={ROUTES.STACK.HOME}
          children={(props: any) => (
            <ScreenLoader>
              <HomeScreen {...props} />
            </ScreenLoader>
          )}
          options={{
            headerTitle: 'Home',

            headerLeft: () => <HomeHeaderLeft />,
          }}
        />
        <Stack.Screen
          name={ROUTES.STACK.SHEET}
          children={(props: any) => (
            <ScreenLoader>
              <SheetScreen {...props} />
            </ScreenLoader>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
