import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import cartReducer from "./cartSlice";
import productDetailReducer from "./productDetailSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
  middleware: [thunk],
});
