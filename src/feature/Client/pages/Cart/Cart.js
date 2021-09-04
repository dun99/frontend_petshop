import { Button } from "antd";
import { PRODUCTS_PATH } from "constants/route";
import CartItem from "feature/Client/components/CartItem/CartItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { totalCart } from "redux/cartSlice";
import "./Cart.scss";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);
  const amount = useSelector((state) => state.cart.cartTotalAmount);

  useEffect(() => {
    dispatch(totalCart());
  }, [cart]);

  const renderCart = (list) => {
    return list.map((item, index) => {
      return <CartItem product={item} key={index} />;
    });
  };

  return (
    <div className="cart-table">
      <ToastContainer autoClose={2000} />
      <table>
        <thead>
          <th>Sản phẩm</th>
          <th>Mô tả</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Tổng</th>
          <th>Thao tác</th>
        </thead>
        <tbody>{renderCart(cart)}</tbody>
      </table>
      <div className="cart-desc">
        <p>Freeship cho đơn hàng từ 150k nội thành HN</p>
        <p>Hỗ trợ ship 30k cho đơn hàng từ 500k toàn quốc</p>
        <p>Đơn hàng trên website được xử lý trong giờ hành chính</p>
      </div>
      <div className="total-cart">
        <span>Tổng tiền: </span>
        <span>{amount}</span>
      </div>
      <div className="action-cart">
        <Button type="primary">
          <Link to={PRODUCTS_PATH}>Tiếp tục mua sắm</Link>
        </Button>
        <Button>Thanh toán</Button>
      </div>
    </div>
  );
}

export default Cart;
