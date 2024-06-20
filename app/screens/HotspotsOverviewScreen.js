import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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

  const toggleFavorite = async (name) => {
    const newSaveLocation = { ...saveLocation, [name]: !saveLocation[name] };
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
        <View key={index} style={styles.item}>
          <Text style={[
            styles.text,
            isDarkMode && styles.darkThemeText,
            saveLocation[id] && styles.favoriteText
          ]}>
            Naam: {marker.name}
          </Text>
          <Button
            title={saveLocation[name] ? 'Unfavorite' : 'Favorite'}
            onPress={() => toggleFavorite(name)}
            color={saveLocation[name] ? 'green' : 'blue'}
          />
          <Button
            title="View location"
            onPress={() => navigation.navigate('Map', { id })}
            color="orange"
          />
        </View>
      ))}
    </View>
  );
}
