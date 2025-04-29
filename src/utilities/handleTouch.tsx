import { nextPokemon, prevPokemon } from './nextPrev';

export const handleTouchStart = (
  e: React.TouchEvent<HTMLElement>,
  setTouchStartX: React.Dispatch<
    React.SetStateAction<number | null>
  >
) => {
  setTouchStartX(e.targetTouches[0].clientX);
};

export const handleTouchMove = (
  e: React.TouchEvent<HTMLElement>,
  setTouchEndX: React.Dispatch<
    React.SetStateAction<number | null>
  >
) => {
  setTouchEndX(e.targetTouches[0].clientX);
};

export const handleTouchEnd = (
  touchStartX: number | null,
  touchEndX: number | null,
  setTouchStartX: React.Dispatch<
    React.SetStateAction<number | null>
  >,
  setTouchEndX: React.Dispatch<
    React.SetStateAction<number | null>
  >,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  listItemRefs: React.RefObject<HTMLLIElement[]>
) => {
  if (!touchStartX || !touchEndX) return;

  const distance = touchStartX - touchEndX;

  if (Math.abs(distance) > 50) {
    if (distance > 0) {
      nextPokemon(setIndex, listItemRefs);
    } else {
      prevPokemon(setIndex, listItemRefs);
    }
  }

  setTouchStartX(null);
  setTouchEndX(null);
};
