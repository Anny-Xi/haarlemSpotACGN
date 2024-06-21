import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';

import { ThemeContext } from '../setting/ThemeContext';
import { LoadLocationMarkerData } from '../list/ListHotspots';
import { styles } from '../style/Styling';

export default function Overview() {
  const navigation = useNavigation(); 
  const [markerList, setList] = useState([]);
  const [saveLocation, setLocation] = useState({});

  const { isDarkMode } = useContext(ThemeContext);
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const iconStyle = isDarkMode ? 'white' : 'black';

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

  const toggleFavorite = async (locationName) => {
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
            <Pressable
              onPress={() => toggleFavorite(marker.locationName)}
              style={[styles.goLocationButton, { flex: 1 }]}
            >
              {saveLocation[marker.locationName] ? <AntDesign name="heart" size={24} color={iconStyle} /> : <AntDesign name="hearto" size={20} color={iconStyle} />}
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Map', { marker })} // <--- Add this line
              style={[styles.row, styles.goLocationButton, { flex: 2 }]}
            >
              <Text
                style={[
                  styles.overViewText, themeTextStyle, { marginRight: 5 }
                ]}
              >
                Locatie bekijken
              </Text>
              <AntDesign name="doubleright" size={20} color={iconStyle} />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
