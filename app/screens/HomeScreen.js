import * as React from 'react';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable } from 'react-native';

import { ThemeContext } from '../setting/ThemeContext';

import { styles } from '../style/Styling';



function HomeScreen() {

  const navigation = useNavigation(); 
  const { isDarkMode } = useContext(ThemeContext);

  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      {/* <Text style={[styles.text, themeTextStyle]}>Menu</Text> */}

      
      <Pressable onPress={() => navigation.navigate('Map')}
        style={[styles.navButton, themeButtonStyle ]}
      >
        <Text style={[styles.text, themeTextStyle]}>Ga naar Map</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Setting')}
        style={[styles.navButton, themeButtonStyle ]}
      >
        <Text style={[styles.text, themeTextStyle]}>Instelling</Text>
      </Pressable>
    </View>
  );
}
export { HomeScreen }