import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderItemApi from "api/orderItemApi";

let initialState = {
  list: {},
  count: 0,
};

export const fetchOrderItemRequest = createAsyncThunk(
  "orderItem/fetchOrderItem",
  async (paramString) => {
    const res = await orderItemApi.getAll(paramString);
    console.log("res", res);
    return res;
  }
);

export const orderItemSlice = createSlice({
  name: "order",
  initialState,

  reducers: {},

  extraReducers: {
    // [fetchOrderItemRequest.pending]: (state) => {
    //   state.status = "loading";
    // },

    // [fetchOrderItemRequest.rejected]: (state) => {
    //   state.status = "failed";
    // },

    [fetchOrderItemRequest.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.count = action.payload.total;
    },
  },
});

export default orderItemSlice.reducer;
