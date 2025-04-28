import { adjustColor } from './adjustColor';

export const INITIAL_DETAIL = {
  id: '',
  image: '',
  type: '',
  name: '',
  height: '',
  weight: '',
  abilities: '',
};

export const INITIAL_STATS = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
};

export const setGradient = (color: string) =>
  `linear-gradient(to bottom right, ${adjustColor(
    color
  )}, #98989880)`;
