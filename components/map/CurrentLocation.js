import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

// import { loadLocationMarkerData } from '../list/ListMarkers';

// async function loadMarkers() {

//   let data = await loadLocationMarkerData(); // await makes sure that the function will finish
//   console.log("this is the data");
//   console.log(data);
// }

export default function CurrentLocation() {

  const [location, setLocation] = useState(null);//location data
  const [errorMsg, setErrorMsg] = useState(null);// error message
  const [mLat, setMLat] = useState(0); //latitude position
  const [mLong, setMLong] = useState(0); //longitude position

  //set location of the user
  async function liveLocation(){
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
    // importeren van de andere pakket
    setLocation(location);
    setMLat(location.coords.latitude);
    setMLong(location.coords.longitude);
  }

  //ask for permission
  useEffect(() => {
    (async () => {
      // loadMarkers();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //run get current location function
        liveLocation();
    })();
  }, []);

  let message = 'Waiting..';
  if (errorMsg) {
    message = errorMsg;
  } else if (location) {
    message = JSON.stringify(location);
    console.log(message);
  }

  const getLocation = () => {
    liveLocation()
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{message}</Text> */}
      <MapView
        style={styles.map}
        region={{
          latitude: mLat,
          longitude: mLong,
          latitudeDelta: 0.01,
          longitudeDelta: 0.011,
        }}
      >
        {/*marker for current location*/}
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} />

      </MapView>
      <TouchableOpacity
        style={styles.buttonLocation}
        onPress={getLocation}>
        <Text>Get Current Location</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonLocation: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'lightblue',
    bottom: 20, // Adjusted positioning
  }
});