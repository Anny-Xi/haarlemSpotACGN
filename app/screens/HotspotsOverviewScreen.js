import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';
import CustomPressable from '../components/CustomPressable';

export default function Overview() {
  const navigation = useNavigation();
  const [markerList, setList] = useState([]); // State to store list of markers
  const [saveLocation, setLocation] = useState({}); // State to store saved locations

  // Access theme context to determine if dark mode is enabled
  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const iconStyle = isDarkMode ? '#F5F5D1' : '#24402E';

  // Load marker data and saved locations when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const loadedMarker = await LoadLocationMarkerData();
      setList(loadedMarker.markers); // Set marker list with loaded data
    };

    const loadSavedLocations = async () => {
      try {
        const savedLocations = await AsyncStorage.getItem('saveLocation');
        if (savedLocations) {
          setLocation(JSON.parse(savedLocations)); // Set saved locations with data from storage
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    loadSavedLocations();
  }, []);

  // Toggle save status of a location and store it in async storage
  const toggleSave = async (locationName) => {
    const newSaveLocation = { ...saveLocation, [locationName]: !saveLocation[locationName] };
    setLocation(newSaveLocation);
    try {
      await AsyncStorage.setItem('saveLocation', JSON.stringify(newSaveLocation));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {markerList.map((marker, index) => (
        <View
          key={index}
          style={[styles.overViewItem, themeButtonStyle]}
        >
          <Text style={[
            styles.overViewText, themeTextStyle, { fontSize: 18 }
          ]}>
            {marker.locationName} {/* Display hotspot location name */}
          </Text>
          <View style={[styles.row]}>
            {/* Button to toggle save status */}
            <CustomPressable
              onPress={() => toggleSave(marker.locationName)}
              iconName={saveLocation[marker.locationName] ? "heart" : "hearto"}
              iconSize={24}
              iconColor={iconStyle}
              buttonStyle={[styles.goLocationButton, { flex: 1 }]}
            />
            {/* Button to navigate to the map view of the hotspot location */}
            <CustomPressable
              onPress={() => navigation.navigate('Map', { marker })}
              text="Locatie bekijken"
              textStyle={[styles.overViewText, themeTextStyle, { marginRight: 5 }]}
              iconName="doubleright"
              iconSize={20}
              iconColor={iconStyle}
              buttonStyle={[styles.row, styles.goLocationButton, { flex: 2 }]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
