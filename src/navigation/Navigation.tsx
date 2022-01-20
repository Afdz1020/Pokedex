import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FavoriteNavigation from './FavoriteNavigation';
import PokedexNavigation from './PokedexNavigation';
import AccountNavigation from './AccountNavigation';

type TabNavigation = {
  Favorite: undefined;
  Pokedex: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<TabNavigation>();

export default function Navigation() {
  const renderPokeBall = () => (
    <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
  );
  const {Navigator, Screen} = Tab;
  return (
    <Navigator>
      <Screen
        name="Favorite"
        component={FavoriteNavigation}
        options={{
          tabBarLabel: 'Favoritos',
          //headerTransparent: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Pokedex"
        component={PokedexNavigation}
        options={{
          tabBarIcon: () => renderPokeBall(),
          headerTransparent: true,
          headerShown: false,
          tabBarLabel: '',
        }}
      />

      <Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  pokeball: {
    width: 75,
    height: 75,
    top: -15,
  },
});
