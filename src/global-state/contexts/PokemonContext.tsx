import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import {
  initialPokemonState,
  pokemonReducer,
} from '../reducers/pokemonReducer';
import { PokemonActionTypes } from '../actions/pokemonActions';

interface PokemonContextType {
  isLoading: boolean;
  dispatch: React.Dispatch<PokemonActionTypes>;
}

// Create the context
const PokemonContext = createContext<
  PokemonContextType | undefined
>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error(
      'usePokemonContext must be used within a PokemonProvider'
    );
  }
  return context;
};

// Dedicated Provider component
interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<
  PokemonProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(
    pokemonReducer,
    initialPokemonState
  );

  const contextValue: PokemonContextType = {
    isLoading: state.isLoading, // Provide isLoading from reducer state
    dispatch, // Provide the dispatch function
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
