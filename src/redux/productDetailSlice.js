import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

let initialState = {
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
    [getProductById.fulfilled]: (state, action) => {
      state.status = "success";
      state.product = action.payload.data;
    },
  },
});

export default productDetailSlice.reducer;
