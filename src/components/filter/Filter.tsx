import { useCallback, useEffect, useState } from 'react';
import { Offcanvas } from '../offcanvas/Offcanvas';
import { Search } from './Search';
import { set, useForm } from 'react-hook-form';
import { FilterForm } from './FilterForm';
import { DevTool } from '@hookform/devtools';
import { useFilterContext } from '../../global-state/contexts/FilterContext';
import useFormPersist from 'react-hook-form-persist';
import { searchPokemonTypes } from '../../api/searchPokemonTypes';
import { PokemonSpecies } from '../../types';
import { usePokemonContext } from '../../global-state/contexts/pokemonContext';
import { setLoading } from '../../global-state/actions/pokemonActions';
import Toast from '../ui/Toast';

// Define the type for the form data
interface FilterFormData {
  pokemonType: [];
  showFavourites: boolean;
}

export const Filter = ({
  searchTerm,
  handleSearch,
  species,
  setSpecies,
  fetchAllSpecies,
}: {
  searchTerm: any;
  handleSearch: (value: string) => void;
  species: PokemonSpecies[];
  setSpecies: React.Dispatch<
    React.SetStateAction<PokemonSpecies[]>
  >;
  fetchAllSpecies: any;
}) => {
  const { isLoading, dispatch } = usePokemonContext();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] =
    useState(false);

  const handleOpenOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<FilterFormData>();

  useFormPersist('myForm', {
    // A unique name for your form
    watch,
    setValue,
    storage: window.localStorage, // or window.sessionStorage
  });

  // React-Hook-Form OnSubmit
  const onSubmit = async (data: FilterFormData) => {
    setFilterData(data);
    setShowFavourites(data?.showFavourites);
    // navigate(`/?fav=${data?.showFavourites}`);
    handleCloseOffcanvas();
    const types =
      data?.pokemonType?.map((type: any) =>
        type?.value.toLowerCase()
      ) || [];

    if (types.length === 0 && !data?.showFavourites) {
      // No filters selected: fetch and show all species
      // setToast({
      //   message: '🗑️ Removed all Filters!',
      //   type: 'error',
      // });
      fetchAllSpecies();
      return;
    }

    const result = await searchPokemonTypes(
      types,
      dispatch,
      setLoading
    );

    if (result) {
      const resultNames = new Set(
        result?.results.map((r) => r.name.toLowerCase())
      );

      const filteredSpecies = species.filter((s) =>
        resultNames.has(s.name.toLowerCase())
      );
      setToast({
        message: '✅ Applied selected Filters!',
        type: 'success',
      });

      setSpecies(filteredSpecies);
    }
  };

  const { filterData, setShowFavourites, setFilterData } =
    useFilterContext();

  return (
    <div className="flex relative justify-between items-center z-[100]">
      <Search
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        register={register}
        handleSubmit={handleSubmit}
      />
      <span className="text-xl font-[600]">
        {filterData?.showFavourites
          ? 'Favourites Pokemon'
          : 'All Pokemon'}
      </span>

      <h1
        className="flex cursor-pointer"
        onClick={handleOpenOffcanvas}
      >
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
      <Offcanvas
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title="Pokedex Filters"
      >
        <FilterForm
          onSubmit={onSubmit}
          control={control}
          register={register}
          handleSubmit={handleSubmit}
          watch={watch} //
          fetchAllSpecies={fetchAllSpecies}
        />
      </Offcanvas>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <DevTool control={control} />
    </div>
  );
};
