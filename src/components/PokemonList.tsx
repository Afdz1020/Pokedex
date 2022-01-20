import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Platform} from 'react-native';
import {PokemonType} from '../types';
import PokemonCard from './PokemonCard';

type Props = {
  pokemons: PokemonType[];
  loadPokemons: () => void;
  isNext: string;
};

export default function PokemonList({pokemons, loadPokemons, isNext}: Props) {
  const loadMore = () => {
    loadPokemons();
  };
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={pokemon => String(pokemon.id)}
      renderItem={({item}) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && isNext !== '' ? (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        ) : null
      }
      onEndReached={() => {
        isNext && isNext !== '' && loadMore();
      }}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === 'android' ? 90 : 60,
  },
});
