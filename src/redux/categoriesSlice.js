import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";
import { toast } from "react-toastify";

let initialState = {
  isLoading: false,
  categories: [],
  count: 0,
};

export const fetchCategoriesRequest = createAsyncThunk(
  "categories",
  async (paramString) => {
    const res = await categoryApi.getAll(paramString);
    return res;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: {
    [fetchCategoriesRequest.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchCategoriesRequest.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchCategoriesRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
      state.count = action.payload.total;
    },
  },
});

export const {
  changePage,
  changeCategory,
  changePrice,
  deleteProduct,
  searchName,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
