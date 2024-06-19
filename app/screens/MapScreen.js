import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';

export default function MapScreen() {

  const [location, setLocation] = useState(null);//location data
  const [errorMsg, setErrorMsg] = useState(null);// error message
  const [mLat, setMLat] = useState(0); //latitude position
  const [mLong, setMLong] = useState(0); //longitude position
  const [markerList, setList] = useState([]);
  const mapRef = useRef(null);

  //set location of the user
  async function liveLocation() {
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
      const loadedMarker = await LoadLocationMarkerData();
      setList(loadedMarker.markers);
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

  //change view to user live location
  const getLiveLocation = async () => {
    await liveLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mLat,
        longitude: mLong,
        latitudeDelta: 0.01,
        longitudeDelta: 0.011,
      }, 500); // animate to new region over 1 second
    }
  };

  //change view to hotspots
  const getHotspotLocation = () => {
    const newLatitude = 52.381;
    const newLongitude = 4.63719;//
    const newLatitudeDelta = 0.000;
    const newLongitudeDelta = 0.015;
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      }, 500); // animate to new region over 1 second
    }
  };

  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{message}</Text> */}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: mLat,
          longitude: mLong,
          latitudeDelta: 0.01,
          longitudeDelta: 0.011,
        }}
      >
        {/*marker for current location*/}
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} pinColor="blue" />

        {/*marker for hotspots*/}
        {markerList.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
          // onPress={() => onPressMarker(marker)}
          />
        ))}

      </MapView>
      <Pressable
        style={[styles.buttonLocation, themeButtonStyle]}
        onPress={getLiveLocation}>
        <Text style={[styles.text, themeTextStyle]}>Get Current Location</Text>
      </Pressable>
      <Pressable
        style={[styles.buttonLocation, { bottom: 80 }, themeButtonStyle]}
        onPress={getHotspotLocation}>
        <Text style={[styles.text, themeTextStyle]}>Get to Hotspot location</Text>
      </Pressable>
    </View>
  );
}
