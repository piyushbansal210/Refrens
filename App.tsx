/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import Navigation from './src/navigation';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
});

export default App;
