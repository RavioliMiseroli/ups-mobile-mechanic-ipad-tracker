import { database } from "./../firebaseConfig";
import { ref, update } from "firebase/database";

export const DATA_PATH = "mock/";
export const dataRef = ref(database, DATA_PATH);

export const updateDeviceStatus = (deviceId: string, status: string) => {
  update(ref(database, DATA_PATH + deviceId), {
    deviceStatus: status,
  });
};
