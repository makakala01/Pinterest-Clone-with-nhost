import { StyleSheet, Image, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MasonryList from '../components/MasonryList';
import { Text, View } from '../components/Themed';
import pins from '../assets/data/pins';
import { Entypo, Feather } from '@expo/vector-icons';


export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
            <Feather name="share" size={24} color="black" style={styles.icon} />
            <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.icon} />
        </View>
          {/* <Image 
        source={{
          uri:"https:notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpeg"
        }}
        style={styles.image}
        /> */
        <Image source={require('../assets/images/dennis.jpeg')}  style={styles.image}/>}
        <Text style={styles.title}>Dennis Makakala</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Followings</Text>
  
        <MasonryList pins={pins}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600"
  },
  image: {
    aspectRatio: 1,
    width: 50,
    height: 180,
    borderRadius: 200,
    left: 119
  },
  header: {
    //alignItems: "center"
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10
  },
  icon: {
    paddingHorizontal: 10
  }
});
