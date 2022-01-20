import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getPokemonDetailsApi} from '../api/pokemon';
import Header from '../components/Pokemon/Header';
import Stats from '../components/Pokemon/Stats';
import Type from '../components/Pokemon/Type';
import {PokemonType, stat} from '../types';
import Favorite from '../components/Pokemon/Favorite';
import useAuth from '../hooks/useAuth';

type descriptionPokemon = {
  name: string;
};

type Sprites = {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
  back_default: string;
};

type types = {
  type: descriptionPokemon;
};

type PokemonState = PokemonType & {
  types: types[];
  sprites: Sprites;
  stats: stat[];
};

type RootStackParamList = {
  Pokedex: undefined;
  Pokemon: {id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;

export default function Pokemon({route, navigation}: Props) {
  const {params} = route;
  const [pokemon, setPokemon] = useState<PokemonState>({} as PokemonState);
  const {auth} = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        auth && Object.keys(auth).length ? <Favorite id={pokemon?.id} /> : null,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          size={20}
          color="#fff"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, params, pokemon.id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params, navigation]);

  if (!pokemon) {
    return null;
  }

  return (
    <ScrollView>
      {pokemon && Object.keys(pokemon).length !== 0 ? (
        <View>
          <Header
            name={pokemon.name}
            order={pokemon.order}
            image={pokemon.sprites.other['official-artwork'].front_default}
            type={pokemon.types[0].type.name}
          />

          <Type types={pokemon.types} />
          <Stats stats={pokemon.stats} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
});
