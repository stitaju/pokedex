import {
  nextPokemon,
  prevPokemon,
} from '../../utilities/nextPrev';

type ChevronProps = {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  listItemRefs: React.RefObject<HTMLLIElement[]>;
};

export const Chevron = ({
  setIndex,
  listItemRefs,
}: ChevronProps) => {
  return (
    <div className="chevron-icons absolute left-50 top-[40%] w-[80%]">
      <div className="flex justify-between text-9xl opacity-30">
        <span
          role="button"
          onClick={() =>
            prevPokemon(setIndex, listItemRefs)
          }
          className="cursor-pointer select-none"
        >
          &#8249;
        </span>

        <span
          role="button"
          className="cursor-pointer select-none"
          onClick={() =>
            nextPokemon(setIndex, listItemRefs)
          }
        >
          &#8250;
        </span>
      </div>
    </div>
  );
};
