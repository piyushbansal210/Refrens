import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import SPLASH_LOGO from "../assets/images/removeback.png";

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
      navigation.navigate("Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={SPLASH_LOGO} style={StyleSheet.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#161617",
  },
  image: {},
});

export default Splash;
