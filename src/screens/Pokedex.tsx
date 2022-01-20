import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {getPokemonsApi, getPokemonDetailsByUrlApi} from '../api/pokemon';
import PokemonList from '../components/PokemonList';
import {PokemonType} from '../types';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [nexUrl, setNexurl] = useState<string>('');

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nexUrl);
      setNexurl(response.next);
      const pokemonsArray = [];

      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other['official-artwork'].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nexUrl}
      />
    </SafeAreaView>
  );
}
