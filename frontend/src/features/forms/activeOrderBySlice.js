import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: "m",
};

const activeOrderBySlice = createSlice({
  name: "active_orderby",
  initialState,
  reducers: {
    setActiveOrderBy: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setActiveOrderBy } = activeOrderBySlice.actions;
export const selectActiveOrderBy = (state) =>
  state.active_orderby.newProjectItems;
export default activeOrderBySlice.reducer;
