import React, {
  useEffect,
  useRef,
  useState,
  RefObject,
  useMemo,
} from 'react'; // Import necessary hooks and types
import {
  setGradient,
  INITIAL_DETAIL,
  INITIAL_STATS,
} from '../utilities/const';
import { Filter } from '../components/filter/Filter';
import { TopBar } from '../components/layout/TopBar';
// Import the new components
import { PokemonContentArea } from '../components/layout/PokemonContentArea';
import { PokemonControls } from '../components/layout/PokemonControls';
import { Copyright } from '../components/ui/Copyright';
import { PokemonSpecies, SelectedPokemon } from '../types';
import { fetchPokemonDetails } from '../api/fetchPokemon';
import {
  nextPokemon,
  prevPokemon,
} from '../utilities/nextPrev';
import {
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
} from '../utilities/handleTouch';
import { fetchSpecies } from '../api/fetchSpecies';
import { Loading } from '../components/ui/Loading'; // Import Loading component
import gsap from 'gsap'; // Import gsap
// Import the context hook and action creator
import { usePokemonContext } from '../global-state/contexts/pokemonContext';
import { setLoading } from '../global-state/actions/pokemonActions';
// Import useForm
import { useFilterContext } from '../global-state/contexts/FilterContext';
import { fetchFavoriteData } from '../api/favorites';

export const MainApp = () => {
  // Consume isLoading and dispatch from the context
  const { isLoading, dispatch } = usePokemonContext();

  // Initialize react-hook-form and get the watch function

  // Manage ALL other state and refs here in MainApp
  const [, setIndex] = useState(0);
  const [species, setSpecies] = useState<PokemonSpecies[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedIndex, setSelectedIndex] = useState<
    number | null
  >(0);
  const [selectedPokemon, setSelectedPokemon] =
    useState<SelectedPokemon | null>(null);
  const [color, setColor] = useState<string>('green');
  const [pokemonDetail, setPokemonDetail] =
    useState(INITIAL_DETAIL);
  const [pokemonStats, setPokemonStats] =
    useState(INITIAL_STATS);
  const [touchStartX, setTouchStartX] = useState<
    number | null
  >(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(
    null
  );

  const loadingRef = useRef<HTMLDivElement | null>(null); // Keep loadingRef here
  const mainRef = useRef<HTMLUListElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<HTMLLIElement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(
    species.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSpecies = species.slice(
    startIndex,
    endIndex
  );

  // Define ALL handler functions here in MainApp
  const setListItemRef =
    (index: number) => (el: HTMLLIElement | null) => {
      if (el) listItemRefs.current[index] = el;
    };

  const handleSpeciesClick = (
    speciesItem: PokemonSpecies,
    index: number
  ) => {
    console.log(speciesItem, index);

    if (species) {
      // Use MainApp's internal state setters
      fetchPokemonDetails(
        speciesItem.url,
        setSelectedPokemon,
        setColor,
        setPokemonDetail,
        setPokemonStats
      );
    }
    setSelectedIndex(index); // Use MainApp's internal state setter
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    // Use MainApp's internal state setters and refs
    if (e.key === 'ArrowRight') {
      nextPokemon(setIndex, listItemRefs);
    }
    if (e.key === 'ArrowLeft') {
      prevPokemon(setIndex, listItemRefs);
    }
  };

  // Touch handlers using MainApp's internal state setters
  const handleTouchStartInternal = (
    e: React.TouchEvent<HTMLElement>
  ) => {
    handleTouchStart(e, setTouchStartX);
  };

  const handleTouchMoveInternal = (
    e: React.TouchEvent<HTMLElement>
  ) => {
    handleTouchMove(e, setTouchEndX);
  };

  const handleTouchEndInternal = () => {
    handleTouchEnd(
      touchStartX,
      touchEndX,
      setTouchStartX,
      setTouchEndX,
      setIndex,
      listItemRefs
    );
  };

  const { filterData } = useFilterContext();
  // Depend on showFavourites from context

  // Effect to fetch initial data (moved back to MainApp)
  const fetchInitialData = async (isLoading?: {
    isLoading?: any;
  }) => {
    if (isLoading) dispatch(setLoading(true)); // Dispatch action from context to set loading true
    try {
      // Use MainApp's internal state setters for other data
      // Modify fetchSpecies to return data or accept setters directly
      // Assuming fetchSpecies is modified to accept setters as before
      await fetchSpecies(
        setSpecies,
        setSelectedPokemon,
        setColor,
        setPokemonDetail,
        setPokemonStats,
        () => {} // Dummy setIsLoading for the original fetchSpecies signature
      );
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
      // Handle error state if needed
    } finally {
      dispatch(setLoading(false)); // Dispatch action from context to set loading false
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [dispatch]); // dispatch is stable, include it

  // Keep original data to restore when search is cleared
  const originalSpecies = useRef<PokemonSpecies[]>([]);

  // Store original data when first loaded
  const storeOriginalData = (data: PokemonSpecies[]) => {
    originalSpecies.current = data;
    setSpecies(data);
  };

  const handleSearch = (searchValue: string) => {
    console.log('SearchValue......:', searchValue);

    setSearchTerm(searchValue);

    if (!searchValue.trim()) {
      // Restore original data when search is cleared
      fetchInitialData(isLoading);
    } else {
      // Filter and update species state
      const filtered = species.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      console.log('Filtered', filtered);

      setSpecies(filtered);
    }
  };

  // Effect for the loading animation (uses isLoading from context)
  useEffect(() => {
    if (isLoading && loadingRef.current) {
      // Use isLoading from context
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0, y: 50, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          ease: 'power2.out',
        }
      );
    }
  }, [isLoading]); // Depend on isLoading from context
  // Effect to focus the main element (uses isLoading from context and internal species state)
  useEffect(() => {
    if (!isLoading && species.length > 0) {
      // Use isLoading from context and internal species state
      mainRef.current?.focus();
    }
  }, [isLoading, species]); // Depend on isLoading and internal species state

  useEffect(() => {
    if (filterData?.showFavourites) {
      //Fetch the details of the favourites and destruct the name and pass the matched names in the species in the topbar
      const favData = fetchFavoriteData('Sirish Titaju');
      dispatch(setLoading(true));
      favData.then((data: any) => {
        const favNames = data?.map(
          (item: any) => item.name
        );
        const filteredSpecies = species.filter(
          (speciesItem: PokemonSpecies) =>
            favNames.includes(speciesItem.name)
        );

        setTimeout(() => {
          dispatch(setLoading(false));
        }, 900);
        setSpecies(filteredSpecies);
      });
    } else {
      if (filterData?.showFavourites) fetchInitialData();
    }
  }, [filterData]); // This effect depends on filterData, which should contain the persisted value

  // Add pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Reset selected index when changing pages
    setSelectedIndex(null);
  };

  // Conditional rendering based on isLoading state from context
  if (isLoading) {
    return <Loading loadingRef={loadingRef} />;
  }

  if (!species || species.length === 0) {
    return (
      <section
        className="main-app relative"
        style={{ background: setGradient(color) }} // Use color from MainApp's state
        onKeyDown={handleKeyDown} // Use handler from MainApp
        tabIndex={0}
        ref={mainRef as RefObject<HTMLUListElement>} // Use ref from MainApp (cast if needed)
        onTouchStart={handleTouchStartInternal} // Use handler from MainApp
        onTouchMove={handleTouchMoveInternal} // Use handler from MainApp
        onTouchEnd={handleTouchEndInternal} // Use handler from MainApp
      >
        <div className="flex flex-col gap-5  justify-center items-center h-[100%] text-2xl">
          <h1 className="text-[2rem] font-bold">
            {' '}
            No Pokemon found :(
          </h1>
          <button
            className="p-4 bg-white cursor-pointer text-black font-bold hover:bg-blue-500 rounded-lg"
            onClick={() => {
              window.location.reload();
            }}
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }
  // Render the main content once loading is complete
  return (
    <section
      className="main-app relative"
      style={{ background: setGradient(color) }} // Use color from MainApp's state
      // onKeyDown={handleKeyDown} // Use handler from MainApp
      tabIndex={0}
      ref={mainRef as RefObject<HTMLUListElement>} // Use ref from MainApp (cast if needed)
      onTouchStart={handleTouchStartInternal} // Use handler from MainApp
      onTouchMove={handleTouchMoveInternal} // Use handler from MainApp
      onTouchEnd={handleTouchEndInternal} // Use handler from MainApp
    >
      <div className="wrapper">
        <Filter
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          species={species}
          setSpecies={setSpecies}
          fetchAllSpecies={fetchInitialData}
        />
        {species.length > 0 && (
          <div className="flex flex-col">
            {/* Add pagination controls */}
            <div className="flex justify-center items-center gap-8 mt-4 mb-4">
              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={() =>
                    handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  style={{
                    display: `${
                      currentPage === 1
                        ? 'none'
                        : 'inline-block'
                    }`,
                  }}
                  className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500"
                >
                  Previous
                </button>
                <TopBar
                  selectedIndex={selectedIndex ?? -1}
                  species={currentSpecies}
                  setListItemRef={setListItemRef}
                  handleSpeciesClick={handleSpeciesClick}
                />
                <button
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
            <p className="text-white">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
        <PokemonContentArea
          fadeRef={fadeRef as RefObject<HTMLDivElement>} // Pass ref from MainApp (cast if needed)
          color={color} // Pass state from MainApp
          pokemonDetail={pokemonDetail} // Pass state from MainApp
          pokemonStats={pokemonStats} // Pass state from MainApp
          selectedPokemon={selectedPokemon} // Pass state from MainApp for conditional rendering
          species={species}
          setSpecies={setSpecies}
          handleSpeciesClick={handleSpeciesClick}
        />
      </div>
      <PokemonControls
        setIndex={setIndex} // Pass setter from MainApp
        listItemRefs={listItemRefs} // Pass ref from MainApp
        selectedPokemon={selectedPokemon} // Pass state from MainApp for conditional rendering
      />
      <Copyright />
    </section>
  );
};
