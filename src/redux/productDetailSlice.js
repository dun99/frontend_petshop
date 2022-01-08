import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

let initialState = {
  isLoading: false,
  product: {},
  status: null,
};

export const getProductById = createAsyncThunk("productsDetail", async (id) => {
  const res = await productApi.getById(id);
  return res;
});

export const productDetailSlice = createSlice({
  name: "productsDetail",
  initialState,
  reducers: {},

  extraReducers: {
    [getProductById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProductById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.status = "success";
      state.product = action.payload.data;
      state.isLoading = false;
    },
  },
});

export default productDetailSlice.reducer;
