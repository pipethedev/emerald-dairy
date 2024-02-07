import { combineReducers } from "redux";
import authSlice from "./slices/auth";
import navbarSlice from "./slices/navbar";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  navbar: navbarSlice.reducer,
  // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
