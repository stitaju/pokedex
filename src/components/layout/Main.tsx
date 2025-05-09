import { PokemonDetail, PokemonStats } from '../../types';
import Stats from './Stats';

type MainProps = {
  fadeRef: React.RefObject<HTMLDivElement | null>;
  color: string;
  pokemonDetail: PokemonDetail;
  pokemonStats: PokemonStats;
};
export const Main = ({
  fadeRef,
  color,
  pokemonDetail,
  pokemonStats,
}: MainProps) => {
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

      <h1 className="md:text-[4em] text-[3em] font-bold capitalize mt-[-1rem]">
        {pokemonDetail.name}
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
      </section>
    </div>
  );
};
