import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: 10000,
};

const displayRecentSlice = createSlice({
  name: "display_recent",
  initialState,
  reducers: {
    setDisplayRecent: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setDisplayRecent } = displayRecentSlice.actions;
export const selectDisplayRecent = (state) =>
  state.display_recent.newProjectItems;
export default displayRecentSlice.reducer;
