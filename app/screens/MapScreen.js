import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { Magnetometer } from 'expo-sensors'; // Import Magnetometer for orientation

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';

export default function MapScreen({ route }) {
  const { marker } = route.params || {}; // Data from route
  const [location, setLocation] = useState(null); // Location data
  const [errorMsg, setErrorMsg] = useState(null); // Error message
  const [mLat, setMLat] = useState(0); // Latitude position
  const [mLong, setMLong] = useState(0); // Longitude position
  const [markerList, setList] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [heading, setHeading] = useState(null); // State for device heading
  const [rotationDegrees, setRotationDegrees] = useState(0); // State for rotation angle of indicator

  const mapRef = useRef(null);
  const navigation = useNavigation();

  // Set location of the user
  async function liveLocation() {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
    setLocation(location);
    setMLat(location.coords.latitude);
    setMLong(location.coords.longitude);
  }

  // Ask for permission and load hotspot marker
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

  useEffect(() => {
    Magnetometer.addListener((data) => {
      const { x, y, z } = data;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(angle >= 0 ? angle : 360 + angle - 40); 
    });

    Magnetometer.setUpdateInterval(500); // The Magnetometer will update every 0.5 second

    return () => {
      Magnetometer.removeAllListeners(); // Clean up listener when app shut down
    };
  }, []);

  useEffect(() => {
    if (heading !== null) {
      setRotationDegrees(heading); // Set rotation angle for indicator
    }
  }, [heading]);

  let message = 'Waiting..';
  if (errorMsg) {
    message = errorMsg;
  } else if (location) {
    message = JSON.stringify(location);
    // console.log(message);
  }

  const getLiveLocation = async () => {
    await liveLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mLat,
        longitude: mLong,
        latitudeDelta: 0.01,
        longitudeDelta: 0.011,
      }, 500); // Animate to new region over 0.5 second
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
      }, 500); // Animate to new region over 0.5 second
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

        {/* Direction Indicator */}
        {heading !== null && (
          <Marker
            coordinate={{ latitude: mLat, longitude: mLong }}
            anchor={{ x: 0.5, y: 0.5 }} // Center anchor
            flat={true} // Marker does not tilt based on the map camera
            rotation={rotationDegrees} // Rotate marker based on device heading
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </Marker>
        )}
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
