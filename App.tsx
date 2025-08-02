import React, {Suspense} from 'react';
const MainApp = React.lazy(() => import('./src/main'));
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ActivityIndicator, Text, View} from 'react-native';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"  />
          </View>
        }>
        <MainApp />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
