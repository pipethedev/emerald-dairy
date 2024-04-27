import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: false,
  reducers: {
    toggleNavbar(state, action: PayloadAction<boolean>) {
      if (action?.payload !== undefined) {
        state = action.payload;
        console.log("N_UND", state);
        return state;
      }
      state = !state;

      return state;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice;
