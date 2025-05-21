import React, { RefObject } from 'react';
import { Main } from './Main'; // Import the existing Main component
import {
  PokemonSpecies,
  SelectedPokemon,
} from '../../types'; // Import types

// Define the props this component needs
interface PokemonContentAreaProps {
  fadeRef: RefObject<HTMLDivElement>;
  color: string;
  pokemonDetail: any; // Consider a more specific type
  pokemonStats: any; // Consider a more specific type
  selectedPokemon: SelectedPokemon | null; // Needed for conditional rendering
  species: any;
  setSpecies: any;
  handleSpeciesClick: (
    species: PokemonSpecies,
    index: number
  ) => void;
}

export const PokemonContentArea: React.FC<
  PokemonContentAreaProps
> = ({
  fadeRef,
  color,
  pokemonDetail,
  pokemonStats,
  selectedPokemon,
  species,
  setSpecies,
  handleSpeciesClick,
}) => {
  // Render the Main component only if a Pokemon is selected
  if (!selectedPokemon) {
    return null; // Or some placeholder if needed
  }

  return (
    <div className="wrapper relative">
      <Main
        fadeRef={fadeRef}
        color={color}
        pokemonDetail={pokemonDetail}
        pokemonStats={pokemonStats}
        species={species}
        setSpecies={setSpecies}
        handleSpeciesClick={handleSpeciesClick}
      />
    </div>
  );
};
