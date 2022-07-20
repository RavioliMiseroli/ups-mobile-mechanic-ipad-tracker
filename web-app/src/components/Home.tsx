import { onValue } from "firebase/database";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { receiveDeviceData } from "../redux/slices/DeviceDataSlice";
import { dataRef } from "../utils/realTimeDb";
import GoogleMaps from "./Map/GoogleMaps";
import SideBar from "./Sidebar";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(receiveDeviceData(data));
    });
  }, []);

  return (
    <div className={`flex flex-row h-[calc(100vh-62px)]`}>
      <div className="w-8/12">
        <GoogleMaps />
      </div>
      <div className="w-4/12">
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
