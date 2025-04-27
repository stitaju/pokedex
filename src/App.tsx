import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Search } from './components/Search';
import Stats from './components/Stats';
import { adjustColor } from './utilities/adjustColor';
import toCamelCase from './utilities/toCamelCase';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import { fetchSpecies } from './api/fetchSpecies';

const INITIAL_DETAIL = {
  id: '',
  image: '',
  type: '',
  name: '',
  height: '',
  weight: '',
  abilities: '',
};

const INITIAL_STATS = {
  hp: '',
  attack: '',
  defense: '',
  specialAttack: '',
  specialDefense: '',
  speed: '',
};

function App() {
  const [index, setIndex] = useState(0);
  const [species, setSpecies] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<
    number | null
  >(0);
  const [selectedPokemon, setSelectedPokemon] =
    useState<any>(null);
  const [color, setColor] = useState('green');
  const [pokemonDetail, setPokemonDetail] =
    useState(INITIAL_DETAIL);
  const [pokemonStats, setPokemonStats] =
    useState(INITIAL_STATS);

  const mainRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<HTMLLIElement[]>([]);

  const gradient = `linear-gradient(to bottom right, ${adjustColor(
    color
  )}, #98989880)`;

  const setListItemRef =
    (index: number) => (el: HTMLLIElement | null) => {
      if (el) listItemRefs.current[index] = el;
    };

  const fetchPokemonDetails = async (
    speciesUrl: string
  ) => {
    try {
      const { data: speciesData } = await axios.get(
        speciesUrl
      );
      setSelectedPokemon(speciesData);
      setColor(speciesData.color.name);

      const pokemonName = speciesData.name;
      const { data: pokemonData } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      setPokemonDetail({
        id: pokemonData.id,
        image:
          pokemonData.sprites.other['official-artwork']
            .front_default,
        type: pokemonData.types[0].type.name,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities[0].ability.name,
      });

      const updatedStats: any = {};

      pokemonData.stats.forEach((stat: any) => {
        updatedStats[toCamelCase(stat.stat.name)] =
          stat.base_stat;
      });
      console.log('updatedStats', updatedStats);
      setPokemonStats(updatedStats);
    } catch (error) {
      console.error(
        'Error fetching Pokémon details:',
        error
      );
    }
  };

  const handleSpeciesClick = (
    speciesItem: any,
    index: number
  ) => {
    console.log('Species Item', speciesItem);

    fetchPokemonDetails(speciesItem.url);
    setSelectedIndex(index);
  };

  useEffect(() => {
    fetchSpecies(setSpecies, listItemRefs);
    mainRef.current?.focus();
  }, []);

  useHorizontalScroll(scrollRef);
  // const [index, setIndex] = useState(0);

  const nextPokemon = () => {
    setIndex((prev) => {
      const newIndex = Math.min(
        prev + 1,
        listItemRefs.current.length - 1
      );
      listItemRefs.current[newIndex]?.click();
      listItemRefs.current[newIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });

      return newIndex;
    });
  };

  const prevPokemon = () => {
    setIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      listItemRefs.current[newIndex]?.click();
      listItemRefs.current[newIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });

      return newIndex;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextPokemon();
    }
    if (e.key === 'ArrowLeft') {
      prevPokemon();
    }
  };

  return (
    <section
      className="main-app relative"
      style={{ background: gradient }}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
    >
      <div className="wrapper">
        <div className="flex justify-between z-[2]">
          <Search />
          <h1 className="flex">
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </h1>
        </div>

        <ul
          className="relative flex gap-2 overflow-x-auto mt-5 z-[2]"
          ref={scrollRef}
        >
          {species.map((speciesItem, index) => (
            <li
              key={speciesItem.name}
              ref={setListItemRef(index)}
              role="button"
              className={`list cursor-pointer flex items-center ${
                selectedIndex === index ? 'active' : ''
              }`}
              onClick={() =>
                handleSpeciesClick(speciesItem, index)
              }
            >
              {speciesItem.name}
            </li>
          ))}
        </ul>

        {selectedPokemon && (
          <div className="fade-up" ref={fadeRef}>
            <div className="relative h-[15rem]">
              <h1 className="number absolute opacity-15 text-[20rem] top-[-8rem] select-none">
                #{String(pokemonDetail.id).padStart(3, '0')}
              </h1>
              <img
                className="absolute right-[8rem] top-[3.5rem]"
                src={
                  pokemonDetail.image ||
                  'https://via.placeholder.com/150'
                }
                width="450px"
                alt={pokemonDetail.name}
              />
            </div>

            <div className="flex gap-2 items-center text-2xl font-extrabold mt-7">
              <div
                className="h-[20px] w-[20px] rounded-full border-5"
                style={{ borderColor: color }}
              ></div>
              {pokemonDetail.type}
            </div>

            <h1 className="text-[4em] font-bold capitalize mt-[-1rem]">
              {pokemonDetail.name}
            </h1>

            <div className="text-2xl flex gap-15">
              <p className="flex items-center gap-2">
                <span>Height:</span>{' '}
                <span className="capitalize">
                  {pokemonDetail.height}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>Abilities:</span>{' '}
                <span className="capitalize">
                  {pokemonDetail.abilities}
                </span>
              </p>
            </div>

            <section className="stats mt-15">
              <p className="text-5xl font-bold">Stats</p>
              <div className="flex flex-col gap-5">
                <Stats label="Hp" stat={pokemonStats.hp} />
                <Stats
                  label="Attack"
                  stat={pokemonStats.attack}
                />
                <Stats
                  label="Defense"
                  stat={pokemonStats.defense}
                />
                <Stats
                  label="Special Attack"
                  stat={pokemonStats.specialAttack}
                />
                <Stats
                  label="Special Defense"
                  stat={pokemonStats.specialDefense}
                />
                <Stats
                  label="Speed"
                  stat={pokemonStats.speed}
                />
              </div>
            </section>
          </div>
        )}
      </div>
      <div className="chevron-icons absolute left-50 top-[40%] w-[80%]">
        <div className="flex justify-between text-9xl opacity-30">
          <span
            role="button"
            onClick={prevPokemon}
            className="cursor-pointer select-none"
          >
            &#8249;
          </span>

          <span
            role="button"
            className="cursor-pointer select-none"
            onClick={nextPokemon}
          >
            &#8250;
          </span>
        </div>
      </div>
    </section>
  );
}

export default App;
