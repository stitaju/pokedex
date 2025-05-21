export const SET_LOADING = 'a';
export const SET_IS_MODAL_OPEN = 'b'

interface SetLoadingAction {
  type: typeof SET_LOADING | typeof SET_IS_MODAL_OPEN;
  payload: boolean;
}

export type PokemonActionTypes = SetLoadingAction;

export const setLoading = (isLoading: boolean): PokemonActionTypes => ({
  type: SET_LOADING,
  payload: isLoading,
}); 