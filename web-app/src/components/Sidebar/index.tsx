import DeviceList from "./DeviceList";
import SearchBar from "./SearchBar";

const SideBar = () => {
  return (
    <div className="flex flex-col bg-[#F2F1EF] h-[calc(100vh-62px)]">
      <div className="mx-2 my-2">
        <SearchBar />
        <DeviceList />
      </div>
    </div>
  );
};

export default SideBar;
