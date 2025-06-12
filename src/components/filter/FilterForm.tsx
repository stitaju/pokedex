import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { pokemonTypes } from '../../utilities/const';
import { useEffect, useCallback, useRef } from 'react';

interface FilterFormProps {
  onSubmit: (data: any) => void;
  register: any;
  control: any;
  handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
  watch: any;
  fetchAllSpecies: any;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  onSubmit,
  control,
  register,
  handleSubmit,
  watch,
  fetchAllSpecies,
}) => {
  const selectedTypes = watch('pokemonType');
  const isFavouriteChecked = watch('showFavourites');

  // Use ref to track previous state and prevent unnecessary calls
  const prevState = useRef({
    typesSelected: false,
    favChecked: false,
    hasCalledFetch: false,
  });

  const isSelectDisabled = isFavouriteChecked === true;
  const isSwitchDisabled = selectedTypes?.length > 0;

  useEffect(() => {
    const typesSelected =
      selectedTypes && selectedTypes.length > 0;
    const favChecked = isFavouriteChecked === true;

    // Only call fetchAllSpecies if:
    // 1. Both filters are cleared (!typesSelected && !favChecked)
    // 2. AND this is a change from a filtered state (not initial render)
    const shouldFetch = !typesSelected && !favChecked;
    const wasFiltered =
      prevState.current.typesSelected ||
      prevState.current.favChecked;

    if (
      shouldFetch &&
      wasFiltered &&
      !prevState.current.hasCalledFetch
    ) {
      console.log(
        'Calling fetchAllSpecies - filters cleared'
      );
      const disableLoading = false;
      fetchAllSpecies(disableLoading);
      prevState.current.hasCalledFetch = true;
    } else if (!shouldFetch) {
      // Reset the flag when filters are applied
      prevState.current.hasCalledFetch = false;
    }

    // Update previous state
    prevState.current.typesSelected = typesSelected;
    prevState.current.favChecked = favChecked;
  }, [selectedTypes, isFavouriteChecked]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>You can apply any available filters here.</p>
      <div className="border-t border-gray-600 my-4"></div>
      <div className="mb-4">
        <label className="block text-sm font-medium  mb-2">
          Filter by Type:
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex w-[100%] items-center">
            <Controller
              name="pokemonType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isDisabled={isSelectDisabled}
                  options={pokemonTypes}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder="Select Pokémon Types..."
                  onChange={(selected) => {
                    field.onChange(selected);

                    // Now you can safely call fetchAllSpecies here too
                    if (
                      !selected ||
                      selected.length === 0
                    ) {
                      if (!isFavouriteChecked) {
                        fetchAllSpecies();
                      }
                    }
                  }}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: isSelectDisabled
                        ? '#1f1f1f'
                        : '#2c2c2c',
                      borderColor: '#444',
                      color: '#fff',
                      opacity: isSelectDisabled ? 0.5 : 1,
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#2c2c2c',
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#555'
                        : state.isFocused
                        ? '#3a3a3a'
                        : '#2c2c2c',
                      color: '#fff',
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: '#444',
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: '#fff',
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: '#ccc',
                      ':hover': {
                        backgroundColor: '#666',
                        color: 'white',
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      color: '#fff',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: '#fff',
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: '#aaa',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                      ...theme.colors,
                      primary25: '#3a3a3a',
                      primary: '#555',
                    },
                  })}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 my-4"></div>

      <div className="mb-4">
        <label
          htmlFor="show-favourites"
          className={`flex items-center cursor-pointer ${
            isSwitchDisabled
              ? 'opacity-50 pointer-events-none'
              : ''
          }`}
        >
          <span className="mr-3 text-sm font-medium">
            Show Favourites
          </span>
          <div className="relative">
            <input
              id="show-favourites"
              type="checkbox"
              onChange={() => {}}
              className="sr-only peer"
              {...register('showFavourites')}
              disabled={isSwitchDisabled}
            />
            <div className="block w-12 h-6 rounded-full bg-gray-200 peer-checked:bg-blue-600 transition-colors duration-300"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
          </div>
        </label>
      </div>

      <div className="border-t border-gray-600 my-4"></div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};
