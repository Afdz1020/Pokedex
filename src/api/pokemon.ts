import {API_HOST} from '../utils/constants';

export async function getPokemonsApi(endpointUrl: string) {
  try {
    const url = `${API_HOST}pokemon?limit=20&offset=0`;
    const response = await fetch(endpointUrl || url);
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function getPokemonDetailsByUrlApi(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function getPokemonDetailsApi(id: string | number) {
  try {
    const url = `${API_HOST}pokemon/${id}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return [];
  }
}
