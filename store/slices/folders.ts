import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Folder[] = [];

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    updateFolders(state, action: PayloadAction<Folder[]>) {
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

export const { updateFolders } = foldersSlice.actions;
export default foldersSlice;
