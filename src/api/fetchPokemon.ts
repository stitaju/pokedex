import axios from 'axios';
import toCamelCase from '../utilities/toCamelCase';

export const fetchPokemonDetails = async (
  speciesUrl: string,
  setSelectedPokemon,
  setColor,
  setPokemonDetail,
  setPokemonStats
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

    const updatedStats: any = {};

    pokemonData.stats.forEach((stat: any) => {
      updatedStats[toCamelCase(stat.stat.name)] =
        stat.base_stat;
    });
    console.log('updatedStats', updatedStats);
    setPokemonStats(updatedStats);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
};
