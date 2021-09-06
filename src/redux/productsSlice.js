import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

let initialState = {
  list: [],
  count: 0,
  status: null,
  filters: {
    _page: 1,
    _limit: 6,
  },
};

export const fetchProductsRequest = createAsyncThunk(
  "products",
  async (paramString) => {
    const res = await productApi.getAll(paramString);
    return res;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.filters._page = action.payload._page;
    },

    changeCategory: (state, action) => {
      state.filters = {
        ...state.filters,
        categories: action.payload.categories,
      };
    },

    changePrice: (state, action) => {
      state.filters = {
        ...state.filters,
        price_gte: action.payload.price_gte,
        price_lte: action.payload.price_lte,
      };
    },
  },

  extraReducers: {
    [fetchProductsRequest.pending]: (state) => {
      state.status = "loading";
    },

    [fetchProductsRequest.rejected]: (state) => {
      state.status = "failed";
    },

    [fetchProductsRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload.data;
      state.count = action.payload.total;
    },
  },
});

export const { changePage, changeCategory, changePrice } =
  productsSlice.actions;
export default productsSlice.reducer;
