import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: false,
};

const addCartSlice = createSlice({
  name: "add_cart",
  initialState,
  reducers: {
    setAddCart: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setAddCart } = addCartSlice.actions;
export const selectAddCart = (state) => state.add_cart.newProjectItems;
export default addCartSlice.reducer;
