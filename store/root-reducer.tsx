import { combineReducers } from 'redux';
import authSlice from './slices/auth';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
