import { StyleSheet, Image, ScrollView } from 'react-native';
import MasonryList from '../components/MasonryList';
import { Text, View  } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import pins from '../assets/data/pins';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    
    <MasonryList pins={pins}/>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
});
