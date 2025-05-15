import { PokemonActionTypes, SET_LOADING } from '../actions/pokemonActions'; // Import action types

// Define the state 
export interface PokemonState {
  isLoading: boolean;
}

// Define the initial state
export const initialPokemonState: PokemonState = {
  isLoading: true,
};

// Define the reducer function
export const pokemonReducer = (
  state: PokemonState,
  action: PokemonActionTypes
): PokemonState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};