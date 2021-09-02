import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import productDetailReducer from "./productDetailSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
  },
  middleware: [thunk],
});
