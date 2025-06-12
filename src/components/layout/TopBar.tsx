import { RefObject, useRef, useEffect } from 'react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { PokemonSpecies } from '../../types';

type TopBarProps = {
  selectedIndex: number;
  species: PokemonSpecies[];
  setListItemRef: (
    index: number
  ) => (el: HTMLLIElement | null) => void;
  handleSpeciesClick: (
    species: PokemonSpecies,
    index: number
  ) => void;
};
export const TopBar = ({
  selectedIndex,
  species,
  setListItemRef,
  handleSpeciesClick,
}: TopBarProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  useHorizontalScroll(scrollRef as RefObject<HTMLElement>);

  useEffect(() => {
    if (species && species.length > 0) {
      handleSpeciesClick(species[0], 0);
    }
  }, []);

  return (
    <ul
      className="relative flex gap-2 overflow-x-auto z-[2]"
      ref={scrollRef}
    >
      {species?.map((speciesItem, index) => (
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
  );
};
