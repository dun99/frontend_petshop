import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import revenueApi from "api/revuenusApi";

let initialState = {
  list: [],
};

export const fetchDataStatistic = createAsyncThunk(
  "statistics/revenue",
  async (paramString) => {
    const res = await revenueApi.getAll(paramString);
    return res;
  }
);

export const statisticSlice = createSlice({
  name: "statistic",
  initialState,

  reducers: {},

  extraReducers: {
    [fetchDataStatistic.fulfilled]: (state, action) => {
      state.list = action.payload.data;
    },
  },
});

export default statisticSlice.reducer;
