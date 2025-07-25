import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import BootSplash from 'react-native-bootsplash';

import HomeScreen from './screens/HomeScreen';
import SheetScreen from './screens/SheetScreen';
import {ROUTES, Stack} from './constants/route';
import {Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types/routes';
type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;
const HomeHeaderLeft = () => {
  const navigation = useNavigation<Props['navigation']>();
  return (
    <Button
      title="Go to Sheet"
      onPress={() => navigation.navigate(ROUTES.STACK.SHEET)}
    />
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
          component={HomeScreen}
          options={{
            headerTitle: 'Home',

            headerLeft: () => <HomeHeaderLeft />,
          }}
        />
        <Stack.Screen name={ROUTES.STACK.SHEET} component={SheetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
