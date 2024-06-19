import React, { useContext } from 'react';
import { Text, StyleSheet, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../setting/ThemeContext';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    lightContainer: {
        backgroundColor: '#d0d0c0',
    },
    darkContainer: {
        backgroundColor: '#4C1515',
    },
    lightThemeText: {
        color: '#242c40',
    },
    darkThemeText: {
        color: '#d0d0c0',
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    lightThemeButton: {
        backgroundColor: '#d1d1f5'
    },
    darkThemeButton: {
        backgroundColor: '#6F6F27'
    },
});