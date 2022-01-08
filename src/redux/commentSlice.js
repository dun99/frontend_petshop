import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "api/commentApi";

let initialState = {
  list: [],
  count: 0,
  status: null,
  filters: {
    _page: 1,
    _limit: 10,
  },
  isLoading: false,
};

export const fetchCommentRequest = createAsyncThunk("orders", async (id) => {
  const res = await commentApi.getAll(id);
  return res;
});

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
    [fetchCommentRequest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCommentRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.list = action.payload.data;
    },
    [createCommentRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list.push(action.payload.data);
    },
  },
});

export default OrdersSlice.reducer;
