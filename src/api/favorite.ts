import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAVORITE_STORAGE} from '../utils/constants';

export async function getPokemonsFavoriteApi(): Promise<number[]> {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_STORAGE);
    const response: string = favorites ? favorites : '[]';
    return await JSON.parse(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AddPokemonFavoriteApp(id: number) {
  try {
    const favorites: number[] = await getPokemonsFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isPokemonFavoriteApi(id: number) {
  try {
    const response: number[] = await getPokemonsFavoriteApi();
    return response.includes(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removePokemonFavoriteApu(id: number) {
  try {
    const favorites: number[] = await getPokemonsFavoriteApi();
    const newFavorites = favorites.filter(item => item !== id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
