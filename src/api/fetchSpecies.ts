import axios from 'axios';
import { sortByEvolution } from '../utilities/sorting';
import { PokemonSpecies } from '../types';

export const fetchSpecies = async (
  setSpecies: React.Dispatch<
    React.SetStateAction<PokemonSpecies[]>
  >,
  listItemRefs: React.RefObject<HTMLLIElement[]>
) => {
  try {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/generation/1/'
    );
    const sortedSpecies = sortByEvolution(data);
    setSpecies(sortedSpecies);
    console.log(sortedSpecies);

    setTimeout(() => {
      listItemRefs?.current[0]?.click();
    });
  } catch (error) {
    console.error('Error fetching species:', error);
  }
};
