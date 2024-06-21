import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';

export default function MapScreen({ route }) {
  const { marker } = route.params || {}; //data from route
  const [location, setLocation] = useState(null); // location data
  const [errorMsg, setErrorMsg] = useState(null); // error message
  const [mLat, setMLat] = useState(0); // latitude position
  const [mLong, setMLong] = useState(0); // longitude position
  const [markerList, setList] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const mapRef = useRef(null);
  const navigation = useNavigation();

  // set location of the user
  async function liveLocation() {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
    setLocation(location);
    setMLat(location.coords.latitude);
    setMLong(location.coords.longitude);
  }

  // ask for permission and load hotspot marker
  useEffect(() => {
    (async () => {
      const loadedMarker = await LoadLocationMarkerData();
      setList(loadedMarker.markers);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      liveLocation();
    })();
  }, []);

  //if 
  useEffect(() => {
    if (marker && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: marker.coordinates.latitude,
          longitude: marker.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.011,
        },
        500
      );
    }
  }, [marker]);

  let message = 'Waiting..';
  if (errorMsg) {
    message = errorMsg;
  } else if (location) {
    message = JSON.stringify(location);
    console.log(message);
  }

  const getLiveLocation = async () => {
    await liveLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mLat,
        longitude: mLong,
        latitudeDelta: 0.01,
        longitudeDelta: 0.011,
      }, 500); // animate to new region over 0.5 second
    }
  };

  const getHotspotLocation = () => {
    const newLatitude = 52.381;
    const newLongitude = 4.63719;
    const newLatitudeDelta = 0.000;
    const newLongitudeDelta = 0.015;
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      }, 500); // animate to new region over 0.5 second
    }
  };

  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={marker ? {
          latitude: marker.coordinates.latitude,
          longitude: marker.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.011,
        } : {
          latitude: mLat,
          longitude: mLong,
          latitudeDelta: 0.01,
          longitudeDelta: 0.011,
        }}
        onPress={() => setButtonsVisible(false)}
      >
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} >
          <View style={styles.radius}>
            <View style={styles.currentLocation} />
          </View>
        </Marker>

        {markerList.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.locationName}
          />
        ))}
      </MapView>

      {!buttonsVisible && (
      <Pressable
      style={styles.showButtonsIcon}
      onPress={() => setButtonsVisible(!buttonsVisible)} // Toggle button visibility
    >
      <AntDesign name="menu-fold" size={24} color="black" />
    </Pressable>
      )}



      {buttonsVisible && (
        <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.buttonLocation, themeButtonStyle]}
          onPress={() => navigation.navigate('Overview')}
        >
          <Text style={[styles.buttonText, themeTextStyle]}>Overzicht Hotspot</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonLocation, themeButtonStyle]}
          onPress={getLiveLocation}>
          <Text style={[styles.buttonText, themeTextStyle]}>Ga naar huidig locatie</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonLocation, themeButtonStyle]}
          onPress={getHotspotLocation}>
          <Text style={[styles.buttonText, themeTextStyle]}>Ga naar Haarlem</Text>
        </Pressable>
      </View>
      )}

      
    </View>
  );
}
