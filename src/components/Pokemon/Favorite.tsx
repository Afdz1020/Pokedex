import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  AddPokemonFavoriteApp,
  isPokemonFavoriteApi,
  removePokemonFavoriteApu,
} from '../../api/favorite';

type Props = {
  id: number;
};

export default function Favorite({id}: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [reloadCheck, setReloadCheck] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadCheck]);

  const onReloadCheckFavorite = () => {
    setReloadCheck(prev => !prev);
  };

  const addFavorite = async () => {
    try {
      await AddPokemonFavoriteApp(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApu(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Icon
      name="heart"
      solid={isFavorite}
      size={20}
      color="#FFF"
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={styles.icon}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
});
