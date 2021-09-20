import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import cartReducer from "./cartSlice";
import ordersHistory from "./orderHistorySlice";
import orderReducer from "./orderSlice";
import productDetailReducer from "./productDetailSlice";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    ordersHistory: ordersHistory,
  },
  middleware: [thunk],
});
