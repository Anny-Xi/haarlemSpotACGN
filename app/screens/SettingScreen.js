import React, { useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../setting/ThemeContext';
import { styles } from '../style/Styling';

export default function SettingScreen() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    // Apply styles based on the current theme
    const themeTextStyle = isDarkMode ? styles.darkThemeText : styles.lightThemeText;
    const themeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const themeButton = isDarkMode ? styles.darkThemeButton : styles.lightThemeButton;

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.text, themeTextStyle]}>Mode: {isDarkMode ? 'dark' : 'light'}</Text>
            {/* Button to toggle between dark and light mode */}
            <Pressable onPress={toggleTheme}
                style={[styles.navButton, themeButton]}
            >
                <Text style={[styles.text, themeTextStyle]}>Mode veranderen</Text>
            </Pressable>
            {/* Adjust the status bar style based on the theme */}
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        </View>
    );
}
