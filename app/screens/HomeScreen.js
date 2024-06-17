import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';


export default function HomeScreen({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Dit is de home met een map!</Text>
      <Button title='Map' onPress={() => navigation.navigate('Map',{})} />
      <Button title='Overzicht spot' onPress={() => navigation.navigate('Map',{})} />
      <Button title='Instelling' onPress={() => navigation.navigate('Setting')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
