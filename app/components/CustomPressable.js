import React from 'react';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomPressable = ({ onPress, text, textStyle, iconName, iconSize, iconColor, buttonStyle }) => (
  <Pressable onPress={onPress} style={buttonStyle}>
    {text && <Text style={textStyle}>{text}</Text>}
    {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} />}
  </Pressable>
);

export default CustomPressable;
