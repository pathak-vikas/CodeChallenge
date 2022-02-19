import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: [],
};

const orderItemSlice = createSlice({
  name: "order_items",
  initialState,
  reducers: {
    setOrderItem: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setOrderItem } = orderItemSlice.actions;
export const selectOrderItem = (state) => state.order_items.newProjectItems;
export default orderItemSlice.reducer;
