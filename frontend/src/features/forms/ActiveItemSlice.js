import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: null,
};

const activeItemSlice = createSlice({
  name: "active_item",
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setActiveItem } = activeItemSlice.actions;
export const selectActiveItem = (state) => state.active_item.newProjectItems;
export default activeItemSlice.reducer;
