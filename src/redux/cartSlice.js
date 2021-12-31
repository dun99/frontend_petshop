import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

let initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const getItemIndex = (cart, idFind) => {
  const ids = cart.map((item) => item._id);
  return ids.indexOf(idFind);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = getItemIndex(state.cartItem, action.payload._id);
      if (itemIndex && itemIndex < 0) {
        state.cartItem.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        state.cartItem[itemIndex].quantity += 1;
      }
      toast.success("Thêm vào giỏ hàng thành công", {
        position: "top-right",
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    decreaseCart: (state, action) => {
      state.cartItem.map((item) => {
        if (item._id === action.payload._id) {
          if (item.quantity > 1) {
            const newItem = {
              ...item,
              quantity: item.quantity - 1,
            };
            const itemIndex = getItemIndex(state.cartItem, action.payload._id);
            state.cartItem[itemIndex] = newItem;
          } else {
            const newCart = state.cartItem.filter(
              (product) => product._id !== item._id
            );
            state.cartItem = newCart;
            toast.success("Xóa sản phẩm khỏi giỏ hàng", {
              position: "top-right",
            });
          }
          localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        }
        return state;
      });
    },

    increaseCart: (state, action) => {
      state.cartItem.map((item) => {
        if (item._id === action.payload._id) {
          const newItem = {
            ...item,
            quantity: item.quantity + 1,
          };
          const itemIndex = getItemIndex(state.cartItem, action.payload._id);
          state.cartItem[itemIndex] = newItem;
          localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        }
        return state;
      });
    },

    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (product) => product._id !== action.payload._id
      );
      toast.success("Xóa sản phẩm khỏi giỏ hàng", {
        position: "top-right",
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      return state;
    },

    removeAllCart: (state) => {
      state.cartItem = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItem");
    },

    totalCart: (state) => {
      let total = state.cartItem.reduce((cartTotal, item) => {
        const { price, quantity } = item;
        const itemTotal = price * quantity;
        cartTotal += itemTotal;
        return cartTotal;
      }, 0);
      total = parseFloat(total.toFixed(2));
      state.cartTotalAmount = total;
      state.cartTotalQuantity = state.cartItem.length;
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  increaseCart,
  removeCart,
  totalCart,
  removeAllCart,
} = cartSlice.actions;
export default cartSlice.reducer;
