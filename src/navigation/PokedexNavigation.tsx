import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Pokedex from '../screens/Pokedex';
import Pokemon from '../screens/Pokemon';

type PokedexProps = {
  Pokedexx: undefined;
  PokemonDescription: {id: number};
};

const Stack = createStackNavigator<PokedexProps>();

export default function PokedexNavigation() {
  const {Navigator, Screen} = Stack;
  return (
    <Navigator>
      <Screen
        name="Pokedexx"
        component={Pokedex}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Screen
        name="PokemonDescription"
        component={Pokemon}
        options={{title: '', headerTransparent: true}}
      />
    </Navigator>
  );
}
