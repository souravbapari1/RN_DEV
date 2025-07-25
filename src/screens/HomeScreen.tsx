import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { StackParamList } from '../../types/routes';
import { ROUTES } from '../constants/route';
import MapView, { Callout, Marker } from 'react-native-maps';

type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;
export default function HomeScreen({ navigation, route }: Props) {
  return (
    <View
      style={{
        flex: 1,
      
      }}
    >
      <MapView style={{ flex: 1 }} zoomEnabled={true}  showsUserLocation={true}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
          flat
        >
          <View style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: 25 }} >
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: 50 }}>1</Text>
          </View>

          <Callout>
            <View style={{ width: 150, padding: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Marker Callout</Text>
              <Text>This is a callout for the marker.</Text>
            </View>
          </Callout>
          
        </Marker>
      </MapView>
    </View>
  );
}
