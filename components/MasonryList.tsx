import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import Pin from '../components/Pin';
import pins from '../assets/data/pins';

interface IMasonryList {
    pins: {
        id: string;
        image: string;
        title: string;
    }[]
}

const MasonryList = ({pins}: IMasonryList) => {
  const width = useWindowDimensions().width;

  const numColumn = width < 500 ? 2 : 3;

  return (
    <ScrollView>
        <View style={styles.container}>

          {Array.from(Array(numColumn)).map((col, colIndex) => (
            <View style={{flex: 1}} key={`colIndex_${colIndex}`}>
            {pins.filter((item, index) => index % numColumn === colIndex).map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
          </View>
          ))}
          {/*1st column*/}
          {/* <View style={{flex: 1}}>
            {pins.filter((item, index) => index % 2 === 0).map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
          </View> */}
          {/*2st column*/}
          {/* <View style={{flex: 1}}>
            {pins.filter((item, index) => index % 2 === 1).map((pin) => (
              <Pin pin={pin} key={pin.id}/>
            ))}
          </View> */}
        </View>
    </ScrollView>
  )
}

export default MasonryList

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: "row",
    },
  });