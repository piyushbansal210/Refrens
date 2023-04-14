import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import Fonts from '../constants/Fonts';

const {width, height} = Dimensions.get('screen');

const Card = props => {
  const {name, status, species, gender, image, origin} = props.data;

  const CharacterDisplay = () => {
    props.navigation.navigate('Character', {
      data: props.data,
      name: props.data.name,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => CharacterDisplay()}>
      <View style={styles.innerContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  innerContainer: {},
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  name: {
    fontFamily: Fonts.Luckiest,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default Card;
