
import { StyleSheet, Alert } from 'react-native';
import MasonryList from '../components/MasonryList';
import { RootTabScreenProps } from '../types';

import { useEffect, useState } from 'react';
import { useNhostClient } from '@nhost/react';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const nhost = useNhostClient()

  const [pins, setPins] = useState([])

  const fetchPins = async () => {
    const response = await nhost.graphql.request(`
    query MyQuery {
      pins {
        created_at
        id
        image
        title
        user_id
      }
    }
    `)
    if (response.error) {
      Alert.alert("Error fectching pins")
    } else {
      setPins(response.data.pins)
    }
    console.log(response)
  }

  useEffect(() => {
    fetchPins()
  }, [])

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
