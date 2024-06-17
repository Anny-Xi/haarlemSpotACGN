import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';


export default function HomeScreen({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Dit is de home met een map!</Text>
      <Button title='Go to map' onPress={() => navigation.navigate("Map")} />
      <Button title='Go to Settings' onPress={() => navigation.navigate("Setting")} />
      <StatusBar style="auto" />
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
