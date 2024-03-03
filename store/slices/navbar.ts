import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: false,
  reducers: {
    toggleNavbar(state, action: PayloadAction<boolean>) {
      console.log("STATE_2", { state, action: action?.payload });
      if (action?.payload !== undefined) {
        console.log("NOT_UNDEFINED=>", { payload: action.payload });
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
