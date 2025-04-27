import axios from 'axios';
import { sortByEvolution } from '../utilities/sorting';

export const fetchSpecies = async (
  setSpecies,
  listItemRefs
) => {
  try {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/generation/1/'
    );
    const sortedSpecies = sortByEvolution(data);
    setSpecies(sortedSpecies);

    setTimeout(() => {
      listItemRefs.current[0]?.click();
    });
  } catch (error) {
    console.error('Error fetching species:', error);
  }
};
