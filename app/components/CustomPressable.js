import React from 'react';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from '../style/Styling';

export default function CustomPressable({ onPress, text, textStyle, buttonStyle, iconName, iconSize, iconColor, children }) {
  return (
    <Pressable onPress={onPress} style={[styles.navButton, buttonStyle]}>
      {iconName && <AntDesign name={iconName} size={iconSize} color={iconColor} />}
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      {children}
    </Pressable>
  );
}
