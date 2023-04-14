import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';

import Card from '../components/Card';
import STAR from '../assets/images/star.jpeg';
import Fonts from '../constants/Fonts';

const API_URL = 'https://rickandmortyapi.com/api/character';

const Home = ({navigation}) => {
  const [characters, setCharacters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}?page=${page}`);
    const {results} = await response.json();
    setCharacters(prevCharacters => [...prevCharacters, ...results]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchCharacters();
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (!loading) {
      fetchCharacters();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={STAR} style={styles.imageBack}>
        <View>
          <Text style={styles.header}>CHARACTERS</Text>
        </View>
        <FlatList
          data={characters}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Card data={item} navigation={navigation} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  header: {
    color: 'white',
    fontFamily: Fonts.Luckiest,
    fontSize: 30,
    textAlign: 'center',
  },
  imageBack: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default Home;
