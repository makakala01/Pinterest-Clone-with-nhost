import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import {useState, useEffect} from 'react'

const Pin = (props) => {
  const {image, title} = props.pin

  const [ratio, setRatio] = useState(1)

  const onLike = () => {};

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRatio(width / height))
    }
  }, [image])

  return (
    <View style={styles.pin}>
      <View>
        <Image source={{
          uri: image
        }}
        style={[styles.image, {aspectRatio: ratio}]}
        />

      <Pressable onPress={onLike}>
        <AntDesign name="hearto" size={20} color="black" style={styles.heartBtn} />
      </Pressable>
      </View>
      <Text style={styles.title}>{title}</Text>
      </View>
  )
}

export default Pin

const styles = StyleSheet.create({
    pin: {
      width: '100%'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
    },
    image:{
      width: "100%",
      //height: 200,
      borderRadius: 25,
      //aspectRatio: 1/1,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    heartBtn: {
      backgroundColor: "#D3CFD4",
      position: "absolute",
      bottom: 10,
      right: 10,
      padding: 7,
      borderRadius: 50
    },
  });