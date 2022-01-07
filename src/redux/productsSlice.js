import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { toast } from "react-toastify";
import { LIMIT_PRODUCT } from "util/constant";

const initialState = {
  isLoading: false,
  isFetchProductFailure: false,
  isFetchProductSuccess: false,
  list: [],
  count: 0,
  filters: {
    _page: 1,
    _limit: LIMIT_PRODUCT,
  },
};

export const fetchProductsRequest = createAsyncThunk(
  "products",
  async (paramString) => {
    const res = await productApi.getAll(paramString);
    return res;
  }
);

export const createProductRequest = createAsyncThunk(
  "products/create",
  async (data) => {
    const res = await productApi.create(data);
    return res;
  }
);

export const updateProductRequest = createAsyncThunk(
  "products/update",
  async (data) => {
    const res = await productApi.update(data);
    toast.success("Update product success", {
      position: "top-right",
    });
    console.log("update", res);
    return res;
  }
);

export const deleteProductRequest = createAsyncThunk(
  "products/delete",
  async (data) => {
    const res = await productApi.delete(data._id);
    toast.success("Delete product success", {
      position: "top-right",
    });
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
        _page: 1,
        category: action.payload.category,
      };
    },

    changePrice: (state, action) => {
      state.filters = {
        ...state.filters,
        _page: 1,
        price_gte: action.payload.price_gte,
        price_lte: action.payload.price_lte,
      };
    },

    searchName: (state, action) => {
      state.filters = {
        ...state.filters,
        name: action.payload,
        _page: 1,
      };
    },

    deleteProduct: (state, action) => {
      state.list.filter((item) => item.id !== action.payload.data.id);
      state.count -= 1;
    },
  },

  extraReducers: {
    [fetchProductsRequest.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchProductsRequest.rejected]: (state) => {
      state.isLoading = false;
      state.isFetchProductFailure = true;
      state.isFetchProductSuccess = false;
    },

    [fetchProductsRequest.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.count = action.payload.total;
      state.isLoading = false;
      state.isFetchProductFailure = false;
      state.isFetchProductSuccess = true;
    },

    [createProductRequest.fulfilled]: (state) => {
      state.count += 1;
    },

    [deleteProductRequest.fulfilled]: (state) => {
      state.count -= 1;
    },

    [updateProductRequest.fulfilled]: (state, action) => {
      state.list.map((item, index) => {
        if (item._id === action.payload.data._id) {
          state.list[index] = action.payload.data;
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
} = productsSlice.actions;
export default productsSlice.reducer;
