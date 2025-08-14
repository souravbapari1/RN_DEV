import LinearGradient from 'react-native-linear-gradient';
import {
  createShimmerPlaceholder,
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import React, { memo } from 'react';

const ShimmerLoader = (props: ShimmerPlaceholderProps) => {
  return (
    <ShimmerPlaceHolder
      style={{width: 200, height: 200, marginVertical: 10}}
      shimmerColors={['#f5f5f5ff', '#ebebebff', '#f7f7f7ff']}
      {...props}
      LinearGradient={LinearGradient}
    />
  );
};

export default memo(ShimmerLoader);
