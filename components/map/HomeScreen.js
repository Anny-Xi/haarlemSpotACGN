import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { loadLocationMarkerData } from '../list/ListMarkers';


const markerList = loadLocationMarkerData()

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Dit is de home met een map!</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: 52.381,
          longitude: 4.63719,
          latitudeDelta: 0.000,
          longitudeDelta: 0.015,
        }}
      >
{/* Link for mulipe markers:  https://stackoverflow.com/questions/40541095/render-multiple-marker-in-react-native-maps */}

        {markerList.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.name}
          />
        ))}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
