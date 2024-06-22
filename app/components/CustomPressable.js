import React from 'react';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * CustomPressable is a reusable button component that contents text and/or an icon.
 *
 * @param {function} onPress - Function to be called when the button is pressed.
 * @param {string} text - Text inside the button.
 * @param {object} textStyle - Style object for the text.
 * @param {string} iconName - Name of the icon to be displayed (from AntDesign).
 * @param {number} iconSize - Size of the icon.
 * @param {string} iconColor - Color of the icon.
 * @param {object} buttonStyle - Style object for the button.
 */

const CustomPressable = ({ onPress, text, textStyle, iconName, iconSize, iconColor, buttonStyle }) => (
  <Pressable onPress={onPress} style={buttonStyle}>
    {text && <Text style={textStyle}>{text}</Text>}
    {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} />}
  </Pressable>
);

export default CustomPressable;
