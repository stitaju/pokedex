import { PokemonSpecies } from '../types';

export const sortByEvolution = (data: PokemonSpecies) =>
  data.pokemon_species.sort((a: any, b: any) => {
    const idA = parseInt(
      a.url.split('/').filter(Boolean).pop()
    );
    const idB = parseInt(
      b.url.split('/').filter(Boolean).pop()
    );
    return idA - idB;
  });
