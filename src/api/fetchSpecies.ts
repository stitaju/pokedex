import axios from 'axios';
import { sortByEvolution } from '../utilities/sorting';
import { PokemonSpecies, SelectedPokemon } from '../types';

export const fetchSpecies = async (
  setSpecies: React.Dispatch<
    React.SetStateAction<PokemonSpecies[]>
  >,
  listItemRefs: React.RefObject<HTMLLIElement[]>,
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<SelectedPokemon | null>
  >
) => {
  try {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/generation/1/'
    );
    const sortedSpecies = sortByEvolution(data);
    setSpecies(sortedSpecies);
    console.log(sortedSpecies);

    const { data: speciesData } = await axios.get(
      sortedSpecies[0].url
    );
    setSelectedPokemon(speciesData);

    setTimeout(() => {
      listItemRefs?.current[0]?.click();
    });
  } catch (error) {
    console.error('Error fetching species:', error);
  }
};
