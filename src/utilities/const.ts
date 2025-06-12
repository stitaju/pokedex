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

export const pokemonTypes = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Fire', label: 'Fire' },
  { value: 'Water', label: 'Water' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Grass', label: 'Grass' },
  { value: 'Ice', label: 'Ice' },
  { value: 'Fighting', label: 'Fighting' },
  { value: 'Poison', label: 'Poison' },
  { value: 'Ground', label: 'Ground' },
  { value: 'Flying', label: 'Flying' },
  { value: 'Psychic', label: 'Psychic' },
  { value: 'Bug', label: 'Bug' },
  { value: 'Rock', label: 'Rock' },
  { value: 'Ghost', label: 'Ghost' },
  { value: 'Dragon', label: 'Dragon' },
  { value: 'Dark', label: 'Dark' },
  { value: 'Steel', label: 'Steel' },
  { value: 'Fairy', label: 'Fairy' }
];

