// src/utilities/filterFavorites.ts
import { fetchFavoriteData } from '../api/favorites';
import { PokemonSpecies } from '../types';


export const filterFavorites = async (
  species: PokemonSpecies[],
  setSpecies: React.Dispatch<React.SetStateAction<PokemonSpecies[]>>
) => {
  try {
    // Assuming 'Sirish Titaju' is a placeholder and you might want to pass the user ID/name
    const favData = await fetchFavoriteData('Sirish Titaju');

    // Check if favData is an array and has elements
    if (Array.isArray(favData) && favData.length > 0) {
      // Now TypeScript knows favData is an array
      const favNames = favData.map((item: any) => item.name);
      const filteredSpecies = species.filter((speciesItem: PokemonSpecies) =>
        favNames.includes(speciesItem.name)
      );
      setSpecies(filteredSpecies);
    } else {
      console.log('No favorite data found or fetch failed.');
      // If no favorites or fetch failed, set species to an empty array
      setSpecies([]);
    }
  } catch (error) {
    console.error('Failed to filter favorites:', error);
    // On error, also set species to an empty array
    setSpecies([]);
  }
};