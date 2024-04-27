import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Folder[] = [];

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    updateFolders(state, action: PayloadAction<Folder[]>) {
      if (action?.payload !== undefined) {
        state = action.payload;
        return state;
      }
      return state;
    },
  },
});

export const { updateFolders } = foldersSlice.actions;
export default foldersSlice;
