import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateNotes(state, action: PayloadAction<Note[]>) {
      console.log("STATE_2", { state, action: action?.payload });
      if (action?.payload !== undefined) {
        console.log("NOT_UNDEFINED=>", { payload: action.payload });
        state = action.payload;
        return state;
      }
      return state;
    },
  },
});

export const { updateNotes } = notesSlice.actions;
export default notesSlice;
