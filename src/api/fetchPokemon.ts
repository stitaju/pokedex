import axios from 'axios';
import toCamelCase from '../utilities/toCamelCase';
import {
  GenericPokemonStats,
  PokemonDetail,
  PokemonStatDetail,
  PokemonStats,
  SelectedPokemon,
} from '../types';

export const fetchPokemonDetails = async (
  speciesUrl: string,
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<SelectedPokemon | null>
  >,
  setColor: React.Dispatch<React.SetStateAction<string>>,
  setPokemonDetail: React.Dispatch<
    React.SetStateAction<PokemonDetail>
  >,
  setPokemonStats: React.Dispatch<
    React.SetStateAction<PokemonStats>
  >
) => {
  try {
    const { data: speciesData } = await axios.get(
      speciesUrl
    );
    setSelectedPokemon(speciesData);
    setColor(speciesData.color.name);

    const pokemonName = speciesData.name;
    const { data: pokemonData } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    setPokemonDetail({
      id: pokemonData.id,
      image:
        pokemonData.sprites.other['official-artwork']
          .front_default,
      type: pokemonData.types[0].type.name,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      abilities: pokemonData.abilities[0].ability.name,
    });

    const updatedStats: GenericPokemonStats = {};

    pokemonData.stats.forEach((stat: PokemonStatDetail) => {
      updatedStats[toCamelCase(stat.stat.name)] =
        stat.base_stat;
    });
    setPokemonStats(updatedStats as PokemonStats);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
};
