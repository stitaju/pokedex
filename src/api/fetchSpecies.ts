import axios from 'axios';
import { sortByEvolution } from '../utilities/sorting';
import {
  PokemonDetail,
  PokemonSpecies,
  PokemonStats,
  SelectedPokemon,
} from '../types';
import { fetchPokemonDetails } from './fetchPokemon';

export const fetchSpecies = async (
  setSpecies: React.Dispatch<
    React.SetStateAction<PokemonSpecies[]>
  >,
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<SelectedPokemon | null>
  >,
  setColor: React.Dispatch<React.SetStateAction<string>>,
  setPokemonDetail: React.Dispatch<
    React.SetStateAction<PokemonDetail>
  >,
  setPokemonStats: React.Dispatch<
    React.SetStateAction<PokemonStats>
  >,
  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >
) => {
  try {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1200));

    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/generation/1/'
    );
    const sortedSpecies = sortByEvolution(data);
    setSpecies(sortedSpecies);
    fetchPokemonDetails(
      data.pokemon_species[0].url,
      setSelectedPokemon,
      setColor,
      setPokemonDetail,
      setPokemonStats
    );
  } catch (error) {
    console.error('Error fetching species:', error);
  } finally {
    setIsLoading(false);
  }
};
