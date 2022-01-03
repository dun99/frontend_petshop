import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";
import { toast } from "react-toastify";
let initialState = {
  list: [],
  count: 0,
  orderStatus: null,
  filters: {
    _page: 1,
    _limit: 10,
  },
  orderTotalQuantity: 0,
  orderTotalAmount: 0,
};

export const fetchOrdersRequest = createAsyncThunk(
  "orders/fetchOrders",
  async (paramString) => {
    const res = await orderApi.getAll(paramString);
    return res;
  }
);

export const updateOrderRequest = createAsyncThunk(
  "orders/update",
  async (data) => {
    const res = await orderApi.update(data);
    toast.success("Update order success", {
      position: "top-right",
    });
    return res;
  }
);

export const deleteOrderRequest = createAsyncThunk(
  "orders/delete",
  async (data) => {
    const res = await orderApi.delete(data.id);
    toast.success("Delete order success", {
      position: "top-right",
    });
    return res;
  }
);
export const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: {
    [fetchOrdersRequest.pending]: (state) => {},

    [fetchOrdersRequest.rejected]: (state) => {},

    [fetchOrdersRequest.fulfilled]: (state, action) => {
      console.log(action.payload, "hhhh");
      state.list = action.payload.data;
      state.count = action.payload.total;
      state.orderTotalQuantity = action.payload.orderTotalQuantity;
      state.orderTotalAmount = action.payload.orderTotalAmount;
      state.orderStatus = action.payload.orderStatus;
    },

    [deleteOrderRequest.fulfilled]: (state) => {
      state.status = "success";
      state.count -= 1;
    },

    [updateOrderRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list.map((item, index) => {
        if (item.id === action.payload.data.id) {
          state.list[index] = action.payload.data;
        }
      });
    },
  },
});

export default OrdersSlice.reducer;
