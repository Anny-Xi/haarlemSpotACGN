import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';


export default function SettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Dit is the setting page!</Text>
      <Button title='Go to map' onPress={() => navigation.navigate("Home")} />
      
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
