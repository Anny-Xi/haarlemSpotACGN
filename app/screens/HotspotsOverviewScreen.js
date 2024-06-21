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
  const [markerList, setList] = useState([]);
  const [saveLocation, setLocation] = useState({});

  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const iconStyle = isDarkMode ? '#F5F5D1' : '#24402E';


  useEffect(() => {
    const fetchData = async () => {
      const loadedMarker = await LoadLocationMarkerData();
      setList(loadedMarker.markers);
    };

    const loadSavedLocations = async () => {
      try {
        const savedLocations = await AsyncStorage.getItem('saveLocation');
        if (savedLocations) {
          setLocation(JSON.parse(savedLocations));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    loadSavedLocations();
  }, []);

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
            {marker.locationName}
          </Text>
          <View style={[styles.row]}>
            <CustomPressable
              onPress={() => toggleSave(marker.locationName)}
              iconName={saveLocation[marker.locationName] ? "heart" : "hearto"}
              iconSize={24}
              iconColor={iconStyle}
              buttonStyle={[styles.goLocationButton, { flex: 1 }]}
            />
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
