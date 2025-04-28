import { useRef } from 'react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

export const TopBar = ({
  selectedIndex,
  species,
  setListItemRef,
  handleSpeciesClick,
}) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  useHorizontalScroll(scrollRef);

  return (
    <ul
      className="relative flex gap-2 overflow-x-auto mt-5 z-[2]"
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
