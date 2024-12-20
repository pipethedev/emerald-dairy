"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { apiSlice } from "./slices/api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
