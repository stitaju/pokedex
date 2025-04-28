export type Pokemon = {
  id: number;
  name: string;
  color: { name: string };
};

export type PokemonSpecies = {
  pokemon_species: any;
  name: string;
  url: string;
};

export interface PokemonDetail {
  id: string;
  image: string;
  type: string;
  name: string;
  height: string;
  weight: string;
  abilities: string;
}
export type GenericPokemonStats = {
  [key: string]: number;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonStatDetail = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type SelectedPokemon = {
  id: number;
  name: string;
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: {
    name: string;
    url: string;
  }[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: null | {
    name: string;
    url: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Array<{
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
  has_gender_differences: boolean;
  hatch_counter: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  order: number;
  pal_park_encounters: [];
  pokedex_numbers: [];
  shape: {
    name: string;
    url: string;
  };
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};
