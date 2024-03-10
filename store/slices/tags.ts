import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    updateTags(state, action: PayloadAction<Tag[]>) {
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

export const { updateTags } = tagsSlice.actions;
export default tagsSlice;
