import { configureStore } from "@reduxjs/toolkit";
import deviceData from "./slices/DeviceDataSlice";

const store = configureStore({
  reducer: {
    deviceData,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
