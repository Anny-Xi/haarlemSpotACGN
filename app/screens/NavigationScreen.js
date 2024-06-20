import * as React from 'react';
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Pressable } from 'react-native';

import { ThemeContext } from '../setting/ThemeContext';
//ThemeProvider
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";

import MapScreen from './MapScreen';
import SettingScreen from './SettingScreen';

import { styles } from '../style/Styling';



const Stack = createNativeStackNavigator();

function NavigationScreen({ navigation }) {

  const { isDarkMode } = useContext(ThemeContext);

  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Menu</Text>
      <Pressable onPress={() => navigation.navigate('Map')}
        style={[styles.navButton, themeButtonStyle ]}
      >
        <Text style={[styles.text, themeTextStyle]}>Map</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Map')}
        style={[styles.navButton, themeButtonStyle ]}
      >
        <Text style={[styles.text, themeTextStyle]}>Overicht</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Setting')}
        style={[styles.navButton, themeButtonStyle ]}
      >
        <Text style={[styles.text, themeTextStyle]}>Instelling</Text>
      </Pressable>
    </View>
  );
}

export default function NavigationStack() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={NavigationScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}