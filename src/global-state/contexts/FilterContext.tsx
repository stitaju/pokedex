import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
} from 'react';

// Define the shape of your filter data
interface FilterFormData {
  pokemonType: string;
  showFavourites: boolean;
}

// Define the possible actions for the reducer
type FilterAction =
  | { type: 'SET_POKEMON_TYPE'; payload: string }
  | { type: 'SET_SHOW_FAVOURITES'; payload: boolean }
  | { type: 'SET_ALL_FILTERS'; payload: FilterFormData }; // Action to set the entire state

// Define the reducer function
const filterReducer = (
  state: FilterFormData,
  action: FilterAction
): FilterFormData => {
  switch (action.type) {
    case 'SET_POKEMON_TYPE':
      return { ...state, pokemonType: action.payload };
    case 'SET_SHOW_FAVOURITES':
      return { ...state, showFavourites: action.payload };
    case 'SET_ALL_FILTERS':
      return action.payload; // Replace the entire state with the payload
    default:
      return state; // Return current state for unknown actions
  }
};

// Define the shape of the context value
interface FilterContextType {
  filterData: FilterFormData;
  setPokemonType: (type: string) => void;
  setShowFavourites: (show: boolean) => void;
  setFilterData: (data: FilterFormData) => void;
}

// Create the context with a default value
// The default value is null initially, and we'll handle the case where the context is not used within a Provider
const FilterContext = createContext<
  FilterContextType | undefined
>(undefined);

// Define the props for the provider component
interface FilterProviderProps {
  children: ReactNode;
}

// Define the initial state
const initialFilterState: FilterFormData = {
  pokemonType: 'all', // Default type
  showFavourites: false, // Default favourite state
};

// Create the provider component
export const FilterProvider: React.FC<
  FilterProviderProps
> = ({ children }) => {
  // Initialize the filter state using useReducer
  const [filterData, dispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  // Define action dispatcher functions
  const setPokemonType = (type: string) => {
    dispatch({ type: 'SET_POKEMON_TYPE', payload: type });
  };

  const setShowFavourites = (show: boolean) => {
    dispatch({
      type: 'SET_SHOW_FAVOURITES',
      payload: show,
    });
  };

  const setFilterData = (data: FilterFormData) => {
    dispatch({ type: 'SET_ALL_FILTERS', payload: data });
  };

  // The value provided to the context consumers
  const contextValue: FilterContextType = {
    filterData,
    setPokemonType,
    setShowFavourites,
    setFilterData,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

// Create a custom hook to easily consume the context
export const useFilterContext = () => {
  const context = useContext(FilterContext);

  // Throw an error if the hook is used outside of the provider
  if (context === undefined) {
    throw new Error(
      'useFilterContext must be used within a FilterProvider'
    );
  }

  return context;
};
