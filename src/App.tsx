import { useEffect, useRef, useState } from 'react';
import './style/App.css';
import gsap from 'gsap';

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
import { Loading } from './components/ui/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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

  const loadingRef = useRef<HTMLDivElement | null>(null);
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
    e.preventDefault();
    if (e.key === 'ArrowRight') {
      nextPokemon(setIndex, listItemRefs);
    }
    if (e.key === 'ArrowLeft') {
      prevPokemon(setIndex, listItemRefs);
    }
  };

  useEffect(() => {
    mainRef.current?.focus();
  }, [species]);

  useEffect(() => {
    if (species) {
      fetchSpecies(
        setSpecies,
        setSelectedPokemon,
        setColor,
        setPokemonDetail,
        setPokemonStats,
        setIsLoading
      );
    }
  }, []);

  useEffect(() => {
    if (isLoading && loadingRef.current) {
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
  }, [isLoading]);

  if (isLoading) {
    return <Loading loadingRef={loadingRef} />;
  }

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
      <p className="developed-by flex items-center gap-2 absolute bottom-[7rem] right-[-3rem] rotate-270">
        <div className="line border-b-2 border-amber-50  w-[55px]"></div>
        Developed By:{' '}
        <a
          href="https://sirishtitaju.com.np/"
          target="_blank"
          className="font-medium hover:text-blue-200"
        >
          SIRISH
        </a>
      </p>
    </section>
  );
}

export default App;
