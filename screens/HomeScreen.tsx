import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View  } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Pins from '../components/Pin';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ScrollView>
        <View style={styles.container}>
          <Pins 
            pin={{
              title: "Title asdf",
              image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg"
            }}
          />
          <Pins 
            pin={{
              title: "Title asdf",
              image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/1.jpeg"
            }}
          />
          <Pins 
            pin={{
              title: "Title asdf",
              image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/2.jpeg"
            }}
          />
        </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
