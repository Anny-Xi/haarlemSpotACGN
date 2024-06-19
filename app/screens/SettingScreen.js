import React, { useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../setting/ThemeContext';
import { styles } from '../style/Styling';

export default function SettingScreen() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
    const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const themeButton = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;

    return (
        // button to toggle dark and light mode:
        <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.text, themeTextStyle]}>Mode: {isDarkMode ? 'dark' : 'light'}</Text>
            <Pressable onPress={toggleTheme} 
            style={[styles.navButton, themeButton ]}
            >
                <Text style={[styles.text, themeTextStyle]}>Mode veranderen</Text>
            </Pressable>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        </View>
    );
}