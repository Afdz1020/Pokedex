export type PokemonType = {
  id: number;
  name: string;
  type?: string;
  order: number;
  image?: string;
};

export type descriptionStat = {
  name: string;
};

export type stat = {
  stat: descriptionStat;
  base_stat: number;
};
