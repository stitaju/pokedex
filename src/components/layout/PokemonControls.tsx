import React, { RefObject } from 'react';
import { Chevron } from '../ui/Chevron'; // Import the existing Chevron component
import { SelectedPokemon } from '../../types'; // Import types

// Define the props this component needs
interface PokemonControlsProps {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  listItemRefs: RefObject<HTMLLIElement[]>;
  selectedPokemon: SelectedPokemon | null; // Needed for conditional rendering
}

export const PokemonControls: React.FC<
  PokemonControlsProps
> = ({ setIndex, listItemRefs, selectedPokemon }) => {
  // Render Chevrons only if a Pokemon is selected
  if (!selectedPokemon) {
    return null; // Or some placeholder
  }

  return (
    // Render the Chevron component, passing its required props
    <Chevron
      setIndex={setIndex}
      listItemRefs={listItemRefs}
    />
  );
};
