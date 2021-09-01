import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: [thunk, logger],
});
