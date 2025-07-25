import {View, Text} from 'react-native';
import React, { useLayoutEffect } from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Callout, Marker} from 'react-native-maps';
import BootSplash from "react-native-bootsplash";

const App = () => {
  useLayoutEffect(() => {
    // This is where you can set up any navigation options or other layout effects
           BootSplash.hide({ fade: true });
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          flat
          pinColor="green"
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marker Title"
          description="Marker Description">
          <View style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
            <Text style={{color: 'white'}}>Custom Marker</Text>
          </View>
          <Callout>
            <View>
              <Text>Callout Title</Text>
              <Text>Callout Description</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </GestureHandlerRootView>
  );
};

export default App;
