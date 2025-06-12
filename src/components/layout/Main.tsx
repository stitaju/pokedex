import {
  PokemonDetail,
  PokemonSpecies,
  PokemonStats,
} from '../../types';
import Stats from './Stats';
import React, { useEffect, useState } from 'react';
import {
  addFavoritePokemon,
  deleteFavoritePokemon,
  checkFavoriteStatus,
  fetchFavoriteData,
} from '../../api/favorites';
import { useFilterContext } from '../../global-state/contexts/FilterContext';
import Toast from '../ui/Toast';

type MainProps = {
  fadeRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  pokemonDetail: PokemonDetail;
  pokemonStats: PokemonStats;
  species: any;
  setSpecies: any;
  handleSpeciesClick: (
    species: PokemonSpecies,
    index: number
  ) => void;
};

const HeartIcon = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick?: () => void;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={`${active ? 'red' : 'none'}`}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-8 mt-5 ml-2 cursor-pointer "
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    role="button"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

export const Main = ({
  fadeRef,
  color,
  pokemonDetail,
  pokemonStats,
  species,
  setSpecies,
  handleSpeciesClick,
}: MainProps) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { filterData } = useFilterContext();

  const handleHeartClick = async () => {
    const newIsHeartActive = !isHeartActive;
    setIsHeartActive(newIsHeartActive);

    const userId = 'Sirish Titaju';

    if (newIsHeartActive) {
      const favoriteData = {
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        addedBy: userId,
      };

      try {
        await addFavoritePokemon(favoriteData as any);
        setToast({
          message: '✅ Added to favorites!',
          type: 'success',
        });
      } catch (error) {
        console.error('Failed to add favorite:', error);
        setIsHeartActive(false);
        setToast({
          message: '❌ Failed to add to favorites.',
          type: 'error',
        });
      }
    } else {
      try {
        await deleteFavoritePokemon(
          Number(pokemonDetail.id),
          userId
        ).then(() => {
          setToast({
            message: '🗑️ Deleted from favorites!',
            type: 'error',
          });
          const favData =
            fetchFavoriteData('Sirish Titaju');
          favData.then((data: any) => {
            console.log('DataTransfer', data);

            const favNames = data?.map(
              (item: any) => item.name
            );
            const filteredSpecies = species.filter(
              (speciesItem: any) =>
                favNames.includes(speciesItem.name)
            );

            if (filterData.showFavourites) {
              setSpecies(filteredSpecies);
            }
          });
        });
      } catch (error) {
        console.error('Failed to delete favorite:', error);
        setIsHeartActive(true);
      }
    }
  };

  useEffect(() => {
    const userId = 'Sirish Titaju';
    const fetchFavoriteStatus = async () => {
      try {
        const isFavorite = await checkFavoriteStatus(
          Number(pokemonDetail.id),
          userId
        );
        setIsHeartActive(isFavorite);
      } catch (error) {
        console.error(
          'Error checking favorite status:',
          error
        );
        setIsHeartActive(false);
      }
    };

    if (pokemonDetail && pokemonDetail.id !== undefined) {
      fetchFavoriteStatus();
    }
  }, [pokemonDetail.id]);

  useEffect(() => {
    handleSpeciesClick(species[0], 0);
  }, [species]);

  return (
    <div className="fade-up" ref={fadeRef}>
      <div className="relative h-[15rem]">
        <h1 className="number absolute opacity-15 text-[20rem] top-[-8rem] select-none">
          #{String(pokemonDetail.id).padStart(3, '0')}
        </h1>
        <img
          className="pokemon-img absolute right-[8rem] top-[3.5rem]"
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

      <h1 className="flex w-max relative md:text-[4em] text-[3em] font-bold capitalize mt-[-1rem]">
        {pokemonDetail.name}
        <HeartIcon
          active={isHeartActive}
          onClick={handleHeartClick}
        />
      </h1>

      <div className="md:text-2xl text-xl flex gap-8 md:gap-15">
        <p className="flex items-center gap-2">
          <span>Height:</span>{' '}
          <span className="capitalize font-semibold">
            {pokemonDetail.height}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span>Abilities:</span>{' '}
          <span className="capitalize font-semibold">
            {pokemonDetail.abilities}
          </span>
        </p>
      </div>

      <section className="stats mt-15">
        <p className="md:text-5xl text-3xl  font-bold">
          Stats
        </p>
        <div className="flex flex-col gap-5 md:text-2xl text-xl">
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
          <Stats label="Speed" stat={pokemonStats.speed} />
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </section>
    </div>
  );
};
