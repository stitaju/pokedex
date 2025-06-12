import { UseFormRegister, useForm } from 'react-hook-form';

interface MyFormProps {
  searchTerm: any;
  handleSearch: (value: string) => void;
  register: UseFormRegister<any>;
  handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
}
export const Search = ({
  searchTerm,
  handleSearch,
  register,
  handleSubmit,
}: MyFormProps) => {
  // console.log(register);
  // console.log(handleSubmit);
  const onSubmit = (data) => {
    console.log(data.search);
    handleSearch(data.search);
  };

  return (
    <div className="max-w-md relative z-[2]">
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('search')}
            placeholder="Search Pokémon..."
            className="w-full pr-10 pl-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            onClick={handleSubmit(onSubmit)}
            stroke="currentColor"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white-800 cursor-pointer hover:text-amber-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <ul
            id="suggestionsBox"
            className="absolute z-10 p-2 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-md hidden"
          >
            <li className="p-2">Item 1</li>
            <li className="p-2">Item 2</li>
          </ul>
        </form>
      </div>
    </div>
  );
};
