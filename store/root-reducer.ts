"use client";

import authSlice from "./slices/auth";
import tagsSlice from "./slices/tags";
import modalSlice from "./slices/modal";
import { combineReducers } from "redux";
import { apiSlice } from "./slices/api";
import notesSlice from "./slices/notes";
import navbarSlice from "./slices/navbar";
import foldersSlice from "./slices/folders";
import notesBarSlice from "./slices/notesbar";
import notificationSlice from "./slices/notification";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  navbar: navbarSlice.reducer,
  notesBar: notesBarSlice.reducer,
  modal: modalSlice.reducer,
  notification: notificationSlice.reducer,
  notes: notesSlice.reducer,
  tags: tagsSlice.reducer,
  folders: foldersSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
