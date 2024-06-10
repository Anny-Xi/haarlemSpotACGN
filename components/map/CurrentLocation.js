import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';


const url = "https://github.com/Anny-Xi/haarlemSpotACGN/blob/master/locations.json";

async function loadLocationMarkerData() {

    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;

    } catch (e) {
        console.log('error', e);
    }
}

async function loadMarkers() {


    let data = await loadLocationMarkerData(); // await makes sure that the function will finish
    console.log(data);
}

export default function CurrentLocation() {
  loadMarkers();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Low});
      // importeren van de andere pakket
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});