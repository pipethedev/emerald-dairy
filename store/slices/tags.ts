import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    updateTags(state, action: PayloadAction<Tag[]>) {
      if (action?.payload !== undefined) {
        state = action.payload;
        return state;
      }
      return state;
    },
  },
});

export const { updateTags } = tagsSlice.actions;
export default tagsSlice;
