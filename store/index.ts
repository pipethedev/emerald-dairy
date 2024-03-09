import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { apiSlice } from "./slices/api";

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
