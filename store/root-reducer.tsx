import { combineReducers } from "redux";
import authSlice from "./slices/auth";
import navbarSlice from "./slices/navbar";
import notesBarSlice from "./slices/notesbar";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  navbar: navbarSlice.reducer,
  notesBar: notesBarSlice.reducer,
  // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
