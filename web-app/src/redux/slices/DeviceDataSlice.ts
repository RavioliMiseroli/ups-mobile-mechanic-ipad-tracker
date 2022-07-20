import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeviceLocation = {
  lat: number;
  lon: number;
};

type DeviceData = {
  id: string;
  deviceName: string;
  deviceOwner: string;
  deviceStatus: string;
  locations: {
    [key: string]: DeviceLocation;
  };
};

interface DeviceDataState {
  data: {
    [key: string]: DeviceData;
  };
  search: string;
  filter: string;
}

const initialState: DeviceDataState = {
  data: {},
  search: "",
  filter: "all",
};

const deviceDataSlice = createSlice({
  name: "deviceData",
  initialState,
  reducers: {
    receiveDeviceData: (
      state,
      action: PayloadAction<{
        [key: string]: DeviceData;
      }>
    ) => {
      state.data = action.payload;
      // add id to each device
      for (const key in state.data) {
        state.data[key].id = key;
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const selectFilteredData = (state: RootState) => {
  const { data, filter, search } = state.deviceData;
  const filteredData = Object.values(data).filter(
    (deviceData) =>
      (deviceData.deviceName.toLowerCase().includes(search.toLowerCase()) ||
        deviceData.id.toLowerCase().includes(search.toLowerCase()) ||
        deviceData.deviceOwner.toLowerCase().includes(search.toLowerCase())) &&
      (deviceData.deviceStatus.toLowerCase().includes(filter.toLowerCase()) ||
        filter === "all")
  );
  return filteredData;
};
export const { receiveDeviceData, setSearch, setFilter } =
  deviceDataSlice.actions;
export default deviceDataSlice.reducer;
