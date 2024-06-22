import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { Magnetometer } from 'expo-sensors';

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';
import CustomPressable from '../components/CustomPressable';

export default function MapScreen({ route }) {
  const { marker } = route.params || {};
  // const [location, setLocation] = useState(null);  // State to store user current location
  // const [errorMsg, setErrorMsg] = useState(null);
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);
  const [markerList, setList] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [heading, setHeading] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const mapRef = useRef(null);
  const navigation = useNavigation();

  // Get the current theme context (dark or light mode)
  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;

  // Function to get the current location of the user
  async function liveLocation() {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    // setLocation(location);
    setMLat(location.coords.latitude);
    setMLong(location.coords.longitude);
  }

  // Load markers and request location permissions on component mount
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

  // Animate map to the marker's location if a marker is provided
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

  // Set up magnetometer to get device heading
  useEffect(() => {
    Magnetometer.addListener((data) => {
      const { x, y, z } = data;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(angle >= 0 ? angle : 360 + angle - 40); // Adjust '-40' if the icon/image doesn't point in the right direction
    });

    Magnetometer.setUpdateInterval(500); // Update data every 0.5 seconds

    return () => {
      Magnetometer.removeAllListeners(); // Clean up listener on component unmount
    };
  }, []);

  // Update rotation degrees whenever heading changes
  useEffect(() => {
    if (heading !== null) {
      setRotationDegrees(heading);
    }
  }, [heading]);

  // let message = 'Waiting..';
  // if (errorMsg) {
  //   message = errorMsg;
  // } else if (location) {
  //   message = JSON.stringify(location);
  // }

  // Function to animate map to current location
  const getLiveLocation = async () => {
    await liveLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: mLat,
        longitude: mLong,
        latitudeDelta: 0.01,
        longitudeDelta: 0.011,
      }, 500);
    }
  };

  // Function to animate map to a predefined hotspot location (Haarlem)
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
      }, 500);
    }
  };

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
        onPress={() => setButtonsVisible(false)} // Hide menu when pressing on the map
      >
        {/* Marker for current location */}
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} >
          <View style={styles.radius}>
            <View style={styles.currentLocation} />
          </View>
        </Marker>

        {/* Marker for direction */}
        {heading !== null && (
          <Marker
            coordinate={{ latitude: mLat, longitude: mLong }}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            rotation={rotationDegrees}
            style={[{ zIndex: 10 }]}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </Marker>
        )}

        {/* Markers for hotspot locations */}
        {markerList.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.locationName}
          />
        ))}
      </MapView>

      {/* Show menu button */}
      {!buttonsVisible && (
        <CustomPressable
          onPress={() => setButtonsVisible(!buttonsVisible)}
          iconName="menu-fold"
          iconSize={24}
          iconColor="black"
          buttonStyle={[styles.showButtonsIcon, themeButtonStyle]}
        />
      )}

      {/* Button container on map view */}
      {buttonsVisible && (
        <View style={styles.buttonsContainer}>
          <CustomPressable
            onPress={() => navigation.navigate('Overview')}
            text="Overzicht Hotspot"
            textStyle={[styles.buttonText, themeTextStyle]}
            buttonStyle={[styles.buttonLocation, themeButtonStyle]}
          />
          <CustomPressable
            onPress={getLiveLocation}
            text="Ga naar huidig locatie"
            textStyle={[styles.buttonText, themeTextStyle]}
            buttonStyle={[styles.buttonLocation, themeButtonStyle]}
          />
          <CustomPressable
            onPress={getHotspotLocation}
            text="Ga naar Haarlem"
            textStyle={[styles.buttonText, themeTextStyle]}
            buttonStyle={[styles.buttonLocation, themeButtonStyle]}
          />
        </View>
      )}
    </View>
  );
}
