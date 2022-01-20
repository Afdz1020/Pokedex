import {POKEMON_TYPE_COLORS} from './constants';

//type colorByPokemonType = (type: string) => string;

export default function getColorByPokemonType(type: string): string {
  return POKEMON_TYPE_COLORS[type];
}
