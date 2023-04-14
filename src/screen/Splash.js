import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import React from 'react';

import SPLASH_LOGO from '../assets/images/removeback.png';

const Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#161617'} />
      <Image source={SPLASH_LOGO} style={StyleSheet.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#161617',
  },
  image: {},
});

export default Splash;
