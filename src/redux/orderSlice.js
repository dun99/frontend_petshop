import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";

let initialState = {
  cart: {},
  info: {},
  user: {},
  status: null,
};

export const createOrderRequest = createAsyncThunk(
  "order/createOrder",
  async (orderInfor) => {
    const res = await orderApi.createOrder(orderInfor);
    return res.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {},

  extraReducers: {
    [createOrderRequest.pending]: (state) => {
      state.status = "loading";
    },

    [createOrderRequest.rejected]: (state) => {
      state.status = "failed";
    },

    [createOrderRequest.fulfilled]: (state, action) => {
      state.cart = action.payload.cart;
      state.info = action.payload.info;
      state.user = action.payload.user;
      state.status = "success";
    },
  },
});

export default orderSlice.reducer;
