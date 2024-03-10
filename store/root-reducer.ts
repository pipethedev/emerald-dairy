import { combineReducers } from "redux";
import authSlice from "./slices/auth";
import navbarSlice from "./slices/navbar";
import notesBarSlice from "./slices/notesbar";
import modalSlice from "./slices/modal";
import notificationSlice from "./slices/notification";
import { apiSlice } from "./slices/api";
import notesSlice from "./slices/notes";
import tagsSlice from "./slices/tags";
import foldersSlice from "./slices/folders";

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
  // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
