import * as React from 'react';
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { ThemeContext } from '../setting/ThemeContext';
//ThemeProvider
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SettingScreen from '../screens/SettingScreen';
import Overview from '../screens/HotspotsOverviewScreen';
import Compass from '../components/Compass';


const Stack = createNativeStackNavigator();


export default function NavigationStack() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Compass" component={Compass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
