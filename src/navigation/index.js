import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Splash from '../screen/Splash';
import Home from '../screen/Home';
import Character from '../screen/Character';
import Fonts from '../constants/Fonts';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#161617',
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontFamily: Fonts.Luckiest,
              fontSize: 30,
            },
            // title: 'CHARACTERS',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Character"
          component={Character}
          options={({route, navigation}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#161617',
              elevation: 0,
            },
            headerTitleStyle: {
              color: 'white',
              fontFamily: Fonts.Luckiest,
              fontSize: 30,
              //   backgroundColor: 'green',
              alignItems: 'center',
              //   flex: 1,
            },
            title: route.params.name,
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <AntDesign
                  name="left"
                  color={'white'}
                  size={20}
                  style={styles.back}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    // backgroundColor: 'orange',
    // flex: 1,
    paddingLeft: 15,
  },
});
