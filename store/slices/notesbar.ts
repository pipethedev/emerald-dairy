import { createSlice } from "@reduxjs/toolkit";

const notesBarSlice = createSlice({
  name: "notesBar",
  initialState: false,
  reducers: {
    toggleNotesBar(state) {
      console.log("STATE: ", state);
      state = !state;
      return state;
    },
  },
});

export const { toggleNotesBar } = notesBarSlice.actions;
export default notesBarSlice;
