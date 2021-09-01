import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

let initialState = {
  list: [],
  count: 0,
  status: null,
};

export const fetchProductsRequest = createAsyncThunk(
  "products",
  async (paramString) => {
    const res = await productApi.getAll(paramString);
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProductsRequest.pending]: (state) => {
      state.status = "loading";
    },

    [fetchProductsRequest.rejected]: (state) => {
      state.status = "failed";
    },

    [fetchProductsRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
  },
});

export const productsAction = productsSlice.actions;
export default productsSlice.reducer;
