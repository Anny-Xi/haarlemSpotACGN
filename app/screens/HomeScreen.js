import * as React from 'react';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { ThemeContext } from '../setting/ThemeContext';
import CustomPressable from '../components/CustomPressable';

import { styles } from '../style/Styling';

function HomeScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeButtonStyle = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;
  const iconStyle = isDarkMode ? "#F5F5D1" : "#24402E";

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.titleText, themeTextStyle]}>Hotspot in Haarlem</Text>
      <Text style={[styles.titleText, themeTextStyle]}>"Otaku" editie</Text>
      <FontAwesome6 name="face-smile-wink" size={30} color={iconStyle} />
      <CustomPressable
        onPress={() => navigation.navigate('Map')}
        text="Ga naar Map"
        textStyle={[styles.text, themeTextStyle]}
        buttonStyle={[styles.navButton, themeButtonStyle]}
      />
      <CustomPressable
        onPress={() => navigation.navigate('Setting')}
        text="Instelling"
        textStyle={[styles.text, themeTextStyle]}
        buttonStyle={[styles.navButton, themeButtonStyle]}
      />
    </View>
  );
}

export { HomeScreen };
