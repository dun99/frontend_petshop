import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "api/commentApi";
import { toast } from "react-toastify";
let initialState = {
  list: [],
  count: 0,
  status: null,
  filters: {
    _page: 1,
    _limit: 10,
  },
};

export const fetchCommentRequest = createAsyncThunk(
  "orders",
  async (paramString) => {
    const res = await commentApi.getAll(paramString);
    return res;
  }
);

export const createCommentRequest = createAsyncThunk(
  "comments/create",
  async (data) => {
    const res = await commentApi.create(data);
    return res;
  }
);
export const OrdersSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: {
    [fetchCommentRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload.data;
    },
    [createCommentRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list.push(action.payload.data);
    },
  },
});

export default OrdersSlice.reducer;
