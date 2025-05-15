import React, { RefObject } from 'react';
import { Main } from './Main'; // Import the existing Main component
import { SelectedPokemon } from '../../types'; // Import types

// Define the props this component needs
interface PokemonContentAreaProps {
  fadeRef: RefObject<HTMLDivElement>;
  color: string;
  pokemonDetail: any; // Consider a more specific type
  pokemonStats: any; // Consider a more specific type
  selectedPokemon: SelectedPokemon | null; // Needed for conditional rendering
}

export const PokemonContentArea: React.FC<
  PokemonContentAreaProps
> = ({
  fadeRef,
  color,
  pokemonDetail,
  pokemonStats,
  selectedPokemon,
}) => {
  // Render the Main component only if a Pokemon is selected
  if (!selectedPokemon) {
    return null; // Or some placeholder if needed
  }

  return (
    <div className="wrapper">
      {/* Filter is kept in index.tsx for now */}
      {/* <Filter /> */}

      {/* Render the Main component, passing its required props */}
      <Main
        fadeRef={fadeRef}
        color={color}
        pokemonDetail={pokemonDetail}
        pokemonStats={pokemonStats}
      />
    </div>
  );
};
