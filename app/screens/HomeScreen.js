import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
// import { ThemeContext } from '../setting/ThemeContext'; // Ensure this path is correct

export default function HomeScreen() {
  
  const navigation = useNavigation();

  return (
    <View >
      <Text>
        Dit is de home met een map!
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text>Overicht</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Text>Instelling</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
