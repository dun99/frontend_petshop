import React from "react";
import { formatMoney } from "util/formatMoney";
import OrderDetail from "./OrderDetail";
import "./OrderItem.scss";

function OrderItem(props) {
  const { order } = props;
  const renderCart = (list) => {
    return list.map((item, index) => {
      return <OrderDetail product={item} key={index} />;
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirm":
        return "Đã xác nhận";
      case "shipping":
        return "Đang vận chuyển";
      case "success":
        return "Giao hàng thành công";
      default:
        return "Chờ xác nhận";
    }
  };

  return (
    <>
      {renderCart(order.cart.cartItem)}
      <div className="status">
        <span className="status-title">Trạng thái: </span>
        {renderStatus(order.orderStatus)}
      </div>
      <div className="status total">
        <span className="status-title">Thành tiền: </span>
        <span>{formatMoney(order.cart.cartTotalAmount)}</span>
      </div>
    </>
  );
}

export default OrderItem;
