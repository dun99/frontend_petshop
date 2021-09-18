import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import cartReducer from "./cartSlice";
import CommentsReducer from "./commentSlice";
import ordersHistory from "./orderHistorySlice";
import orderReducer from "./orderSlice";
import productDetailReducer from "./productDetailSlice";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import UsersReducer from "./userSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    ordersHistory: ordersHistory,
    users: UsersReducer,
    orders: ordersReducer,
    comments: CommentsReducer,
  },
  middleware: [thunk],
});
