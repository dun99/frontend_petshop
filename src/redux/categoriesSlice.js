import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";
import { toast } from "react-toastify";
import { LIMIT_PRODUCT } from "util/constant";
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

export const createCategoryRequest = createAsyncThunk(
  "categories/create",
  async (data) => {
    const res = await categoryApi.create(data);
    return res;
  }
);

export const updateCategoryRequest = createAsyncThunk(
  "categories/update",
  async (data) => {
    const res = await categoryApi.update(data);
    return res;
  }
);

export const deleteCategoryRequest = createAsyncThunk(
  "categories/delete",
  async (data) => {
    const res = await categoryApi.delete(data.id);
    toast.success("Delete product success", {
      position: "top-right",
    });
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

    [createCategoryRequest.fulfilled]: (state) => {
      state.count += 1;
    },

    [deleteCategoryRequest.fulfilled]: (state) => {
      state.count -= 1;
    },

    [updateCategoryRequest.fulfilled]: (state, action) => {
      state.categories.map((item, index) => {
        if (item._id === action.payload.data._id) {
          state.categories[index] = action.payload.data;
        }
      });
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
