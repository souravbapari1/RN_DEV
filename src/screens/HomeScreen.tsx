import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageView from '../Components/ImageView';

const HomeScreen = () => {
  const imageWidth = useMemo(() => {
    const {width} = Dimensions.get('window');
    return width / 3 - 8; // Assuming 3 columns and 8px margin
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <FlatList
        data={Array.from({length: 2000}, (_, i) => i + 1)}
        keyExtractor={item => item.toString()}
        numColumns={3}
        style={{padding: 3}}
        renderItem={({item}) => (
          <ImageView
            uri={`https://picsum.photos/200/300?random=${item}`}
            style={{width: imageWidth, height: imageWidth, margin: 3,borderRadius: 0}}
            resizeMode="cover"
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
