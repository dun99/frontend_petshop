import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import CommentsReducer from "./commentSlice";
import ordersHistory from "./orderHistorySlice";
import orderReducer from "./orderSlice";
import ordersReducer from "./ordersSlice";
import productDetailReducer from "./productDetailSlice";
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";
import RevenueReducer from "./statisticSlice";
import UsersReducer from "./userSlice";
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
    revenue: RevenueReducer,
    categories: categoriesReducer,
  },
  middleware: [thunk],
});
