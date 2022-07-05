import { View, Text, StyleSheet, Image, SafeAreaView, Pressable, Alert } from 'react-native'
import {useEffect, useState} from 'react'


import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons  } from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import { useNhostClient } from '@nhost/react'

const GET_PIN_QUERY = `
query MyQuery ($id: uuid!) {
    pins_by_pk(id: $id) {
      created_at
      id
      image
      title
      user {
        avatarUrl
        displayName
        id
      }
      user_id
    }
  }
`

const PinScreen = () => {
    //const pin = pins[0]
    const [ratio, setRatio] = useState(1)
    const [pin, setPin] = useState<any>(null)

    const nhost = useNhostClient()

    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const route = useRoute()

    const pinId = route.params?.id;

    //const pin = pins.find((p) => p.id === pinId)

    const fetchPin = async (pinId) => {
        const response = await nhost.graphql.request(GET_PIN_QUERY, {id: pinId})
        if (response.error) {
            Alert.alert("Error Fetching pin")
        } else {
            setPin(response.data.pins_by_pk)
        }
        console.log(response)
    }

    useEffect(() => {
        fetchPin(pinId)
    }, [pinId])

    useEffect(() => {
        if (pin?.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height))
        }
    }, [pin])

    const goBack = () => {
        navigation.goBack()
    }

    if (!pin) {
        return<Text>Pin not found</Text>
    }

  return (
    <SafeAreaView style={{backgroundColor: "black"}}>
        <StatusBar style="light" />
        <View style={styles.root}>
            <Image  
                source={{uri: pin.image}}
                style={[styles.image, {aspectRatio: ratio}]}
            />
            <Text style={styles.title}>{pin.title}</Text>

            <Pressable style={[styles.backBtn, {top: insets.top + 5}]} onPress={goBack}>
                <Ionicons name={"chevron-back"} size={35} color={"white"} />
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default PinScreen

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    image: {
        width: "100%",
        //height: 300,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    title: {
        mrsgin: 10,
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 35,
    },
    backBtn: {
        position: 'absolute',
        left: 15
    }
})