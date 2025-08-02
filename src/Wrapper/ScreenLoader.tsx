import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import ErrorBoundary from './ErrorBoundary';

const ScreenLoader = (props: any) => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading...</Text>
          </View>
        }>
        {props.children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default ScreenLoader;
