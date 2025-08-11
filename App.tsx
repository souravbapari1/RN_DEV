import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
const MainApp = React.lazy(() => import('./src/main'));
const queryClient = new QueryClient();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Suspense
          fallback={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          }>
          <MainApp />
        </Suspense>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
