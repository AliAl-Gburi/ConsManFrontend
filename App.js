import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from './app/navigation/AppNavigator';



export default function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {

  }, [value])
  function update() {
    setValue(value + 1);
  }
  return (
    <NavigationContainer >
      <AppNavigator forceUpdate={update} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    marginBottom: 200
  }
});
