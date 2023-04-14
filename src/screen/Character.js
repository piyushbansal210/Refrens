import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Fonts from '../constants/Fonts';

const Character = ({route}) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState('unknown');
  const [locationResidents, setLocationResidents] = useState(0);

  const [origin, setOrigin] = useState('unknown');
  const [originResidents, setOriginResidents] = useState(0);

  const fetchEpisodes = async episodeUrls => {
    for (let i = 0; i < episodeUrls.length; i++) {
      if (!episodeUrls[i].endsWith('18')) {
        try {
          fetch(episodeUrls[i]).then(async data => {
            try {
              const d = await data.json();
              setEpisodes(prevEpi => [...prevEpi, d]);
            } catch (e) {
              console.error(i);
            }
          });
        } catch (err) {}
      }
    }

    return episodes;
  };

  const fetchLocation = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {dimension: data.dimension, residents: data.residents.length};
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      if (route.params.data.location.url) {
        const locationOrigin = route.params.data.location.url;

        const locationName = await fetchLocation(locationOrigin);
        setLocation(locationName.dimension);
        setLocationResidents(locationName.residents);
      }
    };

    fetchLocationData();

    const fetchOrigin = async () => {
      if (route.params.data.origin.url) {
        const locationOrigin = route.params.data.origin.url;
        const originName = await fetchLocation(locationOrigin);
        setOrigin(originName.dimension);
        setOriginResidents(originName.residents);
        console.log(originName);
      }
    };

    fetchOrigin();

    const episodeUrls = route.params.data.episode;

    if (episodeUrls.length <= 0) {
      return;
    }
    const fetchEpisodesData = async () => {
      await fetchEpisodes(episodeUrls);
      setLoading(false);
    };

    if (episodes.length === 0) {
      fetchEpisodesData();
    }
  }, []);

  return (
    <FlatList
      data={episodes}
      keyExtractor={(item, index) => '#' + index}
      style={styles.flatLIstSTyle}
      renderItem={({item}) => (
        <View style={styles.itemCard}>
          <Text numberOfLines={1} style={styles.episodeName}>
            {item.name}
          </Text>
          <Text style={styles.airdate}>{item.air_date}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{marginBottom: 20}}>
          <Image style={styles.image} source={{uri: route.params.data.image}} />
          <View style={styles.nameStatus}>
            <Text
              style={[
                styles.bullet,
                {
                  color: route.params.data.status === 'Alive' ? 'green' : 'red',
                },
              ]}>
              {'\u2B24'}
            </Text>
            <Text style={styles.text}>
              {route.params.data.name}
              <Text
                style={{
                  color: route.params.data.status === 'Alive' ? 'green' : 'red',
                }}>
                {' '}
                ({route.params.data.status})
              </Text>
            </Text>
          </View>
          <Text style={styles.species}>
            Species: {route.params.data.species}
          </Text>
          <Text style={styles.Gender}>Gender: {route.params.data.gender}</Text>

          <View style={styles.place}>
            <View style={styles.placeCard}>
              <Text style={styles.title}>Origin</Text>
              <Text style={styles.placeName} numberOfLines={1}>
                {route.params.data.origin.name}
              </Text>
              <Text style={styles.title}>Origin Dimension</Text>

              <Text style={styles.placeDimensions} numberOfLines={1}>
                {origin}
              </Text>
              <Text style={styles.title}>Residents</Text>

              <Text style={styles.placeDimensions}>{originResidents}</Text>
            </View>
            <View style={styles.placeCard}>
              <Text style={styles.title}>Location</Text>
              <Text style={styles.placeName} numberOfLines={1}>
                {route.params.data.location.name}
              </Text>
              <Text style={styles.title}>Location Dimension</Text>

              <Text style={styles.placeDimensions} numberOfLines={1}>
                {location}
              </Text>
              <Text style={styles.title}>Residents</Text>

              <Text style={styles.placeDimensions}>{locationResidents}</Text>
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Luckiest,
  },
  place: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginTop: 10,
  },
  placeCard: {
    flex: 1,
    margin: 2,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    paddingVertical: 10,
  },
  placeName: {
    fontFamily: Fonts.VT323,
    marginBottom: 10,
    fontSize: 16,
  },
  placeDimensions: {
    fontFamily: Fonts.VT323,
    fontSize: 16,
    marginBottom: 10,
  },
  episodeName: {
    fontFamily: Fonts.Luckiest,
  },
  airdate: {
    fontFamily: Fonts.VT323,
    fontSize: 16,
  },
  flatLIstSTyle: {
    paddingHorizontal: 20,
  },
  itemCard: {
    // marginHorizontal: 20,
    backgroundColor: '#fefefe',
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {},
  nameStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bullet: {
    marginTop: 10,
    marginRight: 6,
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 400,
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    fontFamily: Fonts.Luckiest,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  species: {
    fontFamily: Fonts.Luckiest,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  Gender: {
    fontFamily: Fonts.Luckiest,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  origin: {
    fontFamily: Fonts.Luckiest,
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
  },
});

export default Character;
