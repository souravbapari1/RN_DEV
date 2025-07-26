import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar, Text, View} from 'react-native';
import {StackParamList} from '../../types/routes';
import {ROUTES} from '../constants/route';
import MapView, {Callout, Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Armchair } from 'lucide-react-native';

type Props = NativeStackScreenProps<StackParamList, typeof ROUTES.TABS.HOME>;
export default function HomeScreen({navigation, route}: Props) {
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{
        flex: 1,
      }}>
      <StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Armchair />
     
    </SafeAreaView>
  );
}
