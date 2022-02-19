import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: false,
};

const ViewCartSlice = createSlice({
  name: "view_cart",
  initialState,
  reducers: {
    setViewCart: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setViewCart } = ViewCartSlice.actions;
export const selectViewCart = (state) => state.view_cart.newProjectItems;
export default ViewCartSlice.reducer;
