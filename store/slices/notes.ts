import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateNotes(state, action: PayloadAction<Note[]>) {
      if (action?.payload !== undefined) {
        state = action.payload;
        return state;
      }
      return state;
    },
  },
});

export const { updateNotes } = notesSlice.actions;
export default notesSlice;
