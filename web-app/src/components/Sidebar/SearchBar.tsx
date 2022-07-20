import Select, { SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFilter, setSearch } from "../../redux/slices/DeviceDataSlice";

const options = [
  { value: "lost", label: "Lost" },
  { value: "active", label: "Active" },
  { value: "all", label: "All Devices" },
];

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.deviceData.search);
  const filter = useAppSelector((state) => state.deviceData.filter);

  return (
    <div className="flex items-center">
      <Select
        styles={{
          control: (base) => ({
            ...base,
            height: "42px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            width: "160px",
          }),
        }}
        options={options}
        value={options.find((item) => item.value === filter)}
        onChange={(e: SingleValue<typeof options[0]>) => {
          dispatch(setFilter(e!.value));
        }}
      />

      <div className="flex items-center w-full">
        <div className="border-2 border-[#FFC400] ml-2 p-2.5 text-sm font-medium text-white bg-[#FFC400] rounded-tl-lg rounded-bl-lg focus:outline-none   focus:ring-blue-500 focus:border-blue-500">
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full ">
          <input
            type="text"
            id="simple-search"
            className="border-2 border-[#dddddd] text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-tr-lg rounded-br-lg"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
