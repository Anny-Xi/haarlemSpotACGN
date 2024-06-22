import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for theme management
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load the theme from async storage when the component mounts
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme !== null) {
                    setIsDarkMode(storedTheme === 'dark');
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };

        loadTheme();
    }, []);

    // Save the theme to async storage whenever it changes
    useEffect(() => {
        const saveTheme = async () => {
            try {
                await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            } catch (error) {
                console.error('Failed to save theme:', error);
            }
        };

        saveTheme();
    }, [isDarkMode]);

    // Function to toggle between dark and light mode
    const toggleTheme = () => {
        setIsDarkMode(previousState => !previousState);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
