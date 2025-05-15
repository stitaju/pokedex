export const SET_LOADING = 'SET_LOADING';

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type PokemonActionTypes = SetLoadingAction;

export const setLoading = (isLoading: boolean): PokemonActionTypes => ({
  type: SET_LOADING,
  payload: isLoading,
}); 