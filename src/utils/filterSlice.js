import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
  name: "filter",
  initialState: {
    activeFilter: null
  },
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
  }
});

export const { setActiveFilter } = filterSlice.actions;
export default filterSlice.reducer; 