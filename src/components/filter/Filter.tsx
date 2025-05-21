import { useState } from 'react';
import { Offcanvas } from '../offcanvas/Offcanvas';
import { Search } from './Search';
import { useForm } from 'react-hook-form';
import { FilterForm } from './FilterForm';
import { DevTool } from '@hookform/devtools';
import { useFilterContext } from '../../global-state/contexts/FilterContext';
import useFormPersist from 'react-hook-form-persist';

// Define the type for the form data
interface FilterFormData {
  pokemonType: string;
  showFavourites: boolean;
}

export const Filter = () => {
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

  const onSubmit = (data: FilterFormData) => {
    setFilterData(data);
    setShowFavourites(data?.showFavourites);
    // navigate(`/?fav=${data?.showFavourites}`);
    handleCloseOffcanvas();
  };

  const { filterData, setShowFavourites, setFilterData } =
    useFilterContext();

  return (
    <div className="flex relative justify-between items-center z-[100]">
      <Search />
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
          register={register}
          handleSubmit={handleSubmit}
          watch={watch} //
        />
      </Offcanvas>
      <DevTool control={control} />
    </div>
  );
};
