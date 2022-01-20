import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getPokemonsFavoriteApi} from '../api/favorite';
import {getPokemonDetailsApi} from '../api/pokemon';
import {PokemonType} from '../types';
import useAuth from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import NoLogged from '../components/NoLogged';

export default function Favorite() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const {auth} = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth && Object.keys(auth).length) {
        (async () => {
          const response: number[] = await getPokemonsFavoriteApi();
          console.log(response);

          const pokemonsArray = [];

          for await (const pokemon of response) {
            const pokemonDetails = await getPokemonDetailsApi(pokemon);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other['official-artwork'].front_default,
            });

            setPokemons([...pokemons, ...pokemonsArray]);
          }
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]),
  );

  return (
    <View>
      {auth && Object.keys(auth).length ? (
        <PokemonList pokemons={pokemons} loadPokemons={() => {}} isNext={''} />
      ) : (
        <NoLogged />
      )}
    </View>
  );
}
