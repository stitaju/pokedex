import { useForm } from 'react-hook-form';
import Select from 'react-select';

interface FilterFormProps {
  onSubmit: (data: any) => void; // Define a more specific type if possible
  register: any;
  handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
  watch: any;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  onSubmit,
  register,
  handleSubmit,
}) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

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
            <Select options={options} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 my-4"></div>

      <div className="mb-4">
        <label
          htmlFor="show-favourites"
          className="flex items-center cursor-pointer"
        >
          <span className="mr-3 text-sm font-medium">
            Show Favourites
          </span>
          <div className="relative">
            <input
              id="show-favourites"
              type="checkbox"
              className="sr-only peer"
              {...register('showFavourites')}
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
