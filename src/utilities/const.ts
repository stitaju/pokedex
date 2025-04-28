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
  hp: '',
  attack: '',
  defense: '',
  specialAttack: '',
  specialDefense: '',
  speed: '',
};

export const setGradient = (color: string) =>
  `linear-gradient(to bottom right, ${adjustColor(
    color
  )}, #98989880)`;
