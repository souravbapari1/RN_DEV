import {View, Text, ActivityIndicator} from 'react-native';
import React, {Suspense} from 'react';
import ErrorBoundary from './ErrorBoundary';

const ScreenLoader = (props: any) => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        }>
        {props.children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default ScreenLoader;
