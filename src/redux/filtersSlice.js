import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  _page: 1,
  _limit: 9,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});

export const { changePage } = filtersSlice.actions;

export default filtersSlice.reducer;
