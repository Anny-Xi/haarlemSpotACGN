import * as React from 'react';
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { ThemeContext } from '../setting/ThemeContext';
//ThemeProvider
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { HomeScreen } from './HomeScreen';
import MapScreen from './MapScreen';
import SettingScreen from './SettingScreen';
import Overview from './HotspotsOverviewScreen';
import Compass from '../components/Compass';

import { styles } from '../style/Styling';
import CustomPressable from '../components/CustomPressable';

const Stack = createNativeStackNavigator();

function NavigationScreen({ navigation }) {

  const { isDarkMode } = useContext(ThemeContext);

  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      {/* <Text style={[styles.text, themeTextStyle]}>Menu</Text> */}
      <CustomPressable
        onPress={() => navigation.navigate('Map')}
        text="Map"
        textStyle={themeTextStyle}
        buttonStyle={themeButtonStyle}
      />
      <CustomPressable
        onPress={() => navigation.navigate('Overview')}
        text="Overzicht"
        textStyle={themeTextStyle}
        buttonStyle={themeButtonStyle}
      />
      <CustomPressable
        onPress={() => navigation.navigate('Setting')}
        text="Instelling"
        textStyle={themeTextStyle}
        buttonStyle={themeButtonStyle}
      />
      <CustomPressable
        onPress={() => navigation.navigate('Compass')}
        text="Compass"
        textStyle={themeTextStyle}
        buttonStyle={themeButtonStyle}
      />
    </View>
  );
}

export default function NavigationStack() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={NavigationScreen} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Compass" component={Compass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
