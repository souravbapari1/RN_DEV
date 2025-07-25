import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar, Text, View} from 'react-native';
import {StackParamList} from '../../types/routes';
import {ROUTES} from '../constants/route';
import MapView, {Callout, Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;
export default function HomeScreen({navigation, route}: Props) {
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="red"
      />
      <MapView style={{flex: 1}} zoomEnabled={true} showsUserLocation={true}>
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marker Title"
          description="Marker Description"
          flat>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'red',
              borderRadius: 25,
            }}>
            <Text style={{color: 'white', textAlign: 'center', lineHeight: 50}}>
              1
            </Text>
          </View>

          <Callout>
            <View style={{width: 150, padding: 10}}>
              <Text style={{fontWeight: 'bold'}}>Marker Callout</Text>
              <Text>This is a callout for the marker.</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </SafeAreaView>
  );
}
