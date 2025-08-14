import React, {FC, memo, useCallback, useRef, useState} from 'react';
import {Animated, StyleProp, StyleSheet, View} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerLoader from './ShimmerLoader';

interface ImageViewProps extends Omit<FastImageProps, 'source'> {
  uri: string;
  fallbackSource?: Source | number;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
}

const ImageView: FC<ImageViewProps> = ({
  uri,
  fallbackSource,
  style,
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [opacity, isLoading]);

  if (!uri || hasError) {
    if (fallbackSource) {
      return (
        <FastImage
          source={fallbackSource}
          style={style}
          resizeMode={resizeMode}
          {...rest}
        />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <ShimmerLoader
          visible={false}
          LinearGradient={LinearGradient}
          style={[StyleSheet.absoluteFill, styles.shimmer]}
        />
      )}
      <Animated.View style={[StyleSheet.absoluteFill, {opacity}]}>
        <FastImage
          source={{
            uri,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
          onLoadEnd={() => setIsLoading(false)}
          onLoad={handleLoad}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          {...rest}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
  },
});

export default memo(ImageView);
