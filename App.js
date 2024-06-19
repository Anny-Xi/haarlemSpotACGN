import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';

import HomeScreen from './app/screens/HomeScreen';
import CurrentLocation from './app/screens/MapScreen';
import SettingScreen from './app/screens/SettingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // const scheme = useColorScheme();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={CurrentLocation} />
          {/* <Stack.Screen name="Overview" component={CurrentLocation} /> */}
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
