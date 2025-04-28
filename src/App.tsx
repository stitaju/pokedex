import { useEffect, useRef, useState } from 'react';
import './App.css';

import { fetchSpecies } from './api/fetchSpecies';
import {
  nextPokemon,
  prevPokemon,
} from './utilities/nextPrev';
import {
  INITIAL_DETAIL,
  INITIAL_STATS,
  setGradient,
} from './utilities/const';
import { fetchPokemonDetails } from './api/fetchPokemon';
import { TopBar } from './components/layout/TopBar';
import { Chevron } from './components/ui/Chevron';
import { Filter } from './components/filter/Filter';
import { Main } from './components/layout/Main';
import { PokemonSpecies, SelectedPokemon } from './types';

function App() {
  const [, setIndex] = useState(0);
  const [species, setSpecies] = useState<PokemonSpecies[]>(
    []
  );

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

  const mainRef = useRef<HTMLUListElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const listItemRefs = useRef<HTMLLIElement[]>([]);

  const setListItemRef =
    (index: number) => (el: HTMLLIElement | null) => {
      if (el) listItemRefs.current[index] = el;
    };

  const handleSpeciesClick = (
    speciesItem: PokemonSpecies,
    index: number
  ) => {
    if (species) {
      fetchPokemonDetails(
        speciesItem.url,
        setSelectedPokemon,
        setColor,
        setPokemonDetail,
        setPokemonStats
      );
    }
    setSelectedIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextPokemon(setIndex, listItemRefs);
    }
    if (e.key === 'ArrowLeft') {
      prevPokemon(setIndex, listItemRefs);
    }
  };

  useEffect(() => {
    fetchSpecies(
      setSpecies,
      listItemRefs,
      setSelectedPokemon
    );
    setTimeout(() => {
      mainRef.current?.focus();
    }, 0);
  }, []);

  return (
    <section
      className="main-app relative"
      style={{ background: setGradient(color) }}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
      ref={mainRef}
    >
      <div className="wrapper">
        <Filter />
        {species && (
          <TopBar
            selectedIndex={selectedIndex ?? -1}
            species={species}
            setListItemRef={setListItemRef}
            handleSpeciesClick={handleSpeciesClick}
          />
        )}
        {selectedPokemon && (
          <Main
            fadeRef={fadeRef}
            color={color}
            pokemonDetail={pokemonDetail}
            pokemonStats={pokemonStats}
          />
        )}
      </div>
      {selectedPokemon && (
        <Chevron
          setIndex={setIndex}
          listItemRefs={listItemRefs}
        />
      )}
    </section>
  );
}

export default App;
