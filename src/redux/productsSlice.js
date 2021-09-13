import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { toast } from "react-toastify";
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
    return res;
  }
);

export const deleteProductRequest = createAsyncThunk(
  "products/delete",
  async (data) => {
    const res = await productApi.delete(data.id);
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
        categories: action.payload.categories,
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
        name_like: action.payload,
        _page: 1,
      };
    },

    deleteProduct: (state, action) => {
      state.list.filter((item) => item.id !== action.payload.data.id);
      state.count += 1;
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

    [createProductRequest.fulfilled]: (state) => {
      state.status = "success";
      state.count += 1;
    },

    [deleteProductRequest.fulfilled]: (state) => {
      state.status = "success";
      state.count -= 1;
    },

    [updateProductRequest.fulfilled]: (state, action) => {
      state.status = "success";
      state.list.map((item, index) => {
        if (item.id === action.payload.data.id) {
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
