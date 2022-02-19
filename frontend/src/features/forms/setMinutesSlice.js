import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newProjectItems: 40 * 60,
};

const setMinutesSlice = createSlice({
  name: "set_minutes",
  initialState,
  reducers: {
    setMinutes: (state, action) => {
      state.newProjectItems = action.payload;
    },
  },
});

export const { setMinutes } = setMinutesSlice.actions;
export const selectMinutes = (state) => state.set_minutes.newProjectItems;
export default setMinutesSlice.reducer;
