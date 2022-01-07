import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import CommentsReducer from "./commentSlice";
import ordersHistory from "./orderHistorySlice";
import ordersReducer from "./ordersSlice";
import productDetailReducer from "./productDetailSlice";
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";
import UsersReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    auth: authReducer,
    ordersHistory: ordersHistory,
    users: UsersReducer,
    orders: ordersReducer,
    comments: CommentsReducer,
    categories: categoriesReducer,
  },
  middleware: [thunk],
});
