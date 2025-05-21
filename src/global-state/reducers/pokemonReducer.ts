import { PokemonActionTypes, SET_IS_MODAL_OPEN, SET_LOADING } from '../actions/pokemonActions'; // Import action types

// Define the state 
export interface PokemonState {
  isLoading: boolean;
  isModalOpen: boolean;
}

// Define the initial state
export const initialPokemonState: PokemonState = {
  isLoading: true,
  isModalOpen: true
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
    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    default:
      return state;
  }
};