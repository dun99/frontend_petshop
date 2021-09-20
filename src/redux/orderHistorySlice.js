import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";

let initialState = {
  list: [],
  filters: {
    _page: 1,
    _limit: 6,
  },
  status: null,
};

export const fetchOrderHistoryRequest = createAsyncThunk(
  "ordersHistory",
  async (paramString) => {
    const res = await orderApi.getListOrderByUserId(paramString);
    return res;
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterOrder: (state, action) => {
      state.filters = {
        ...state.filters,
        "user.id": action.userID,
      };
    },
  },

  extraReducers: {
    [fetchOrderHistoryRequest.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.status = "success";
      return state;
    },
  },
});
export const { filterOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
