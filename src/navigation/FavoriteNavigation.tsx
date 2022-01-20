import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favorite from '../screens/Favorite';
import Pokemon from '../screens/Pokemon';

type FavoriteProps = {
  Favoritte: undefined;
  PokemonDescription: {id: number};
};

const Stack = createStackNavigator<FavoriteProps>();

export default function FavoriteNavigation() {
  const {Navigator, Screen} = Stack;
  return (
    <Navigator>
      <Screen
        name="Favoritte"
        component={Favorite}
        options={{
          //headerTransparent: true,
          title: '',
        }}
      />

      <Screen
        name="PokemonDescription"
        component={Pokemon}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}
