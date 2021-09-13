import { Button } from "antd";
import { PRODUCTS_PATH, ROOT_PATH } from "constants/route";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.scss";

function OrderSuccess() {
  return (
    <div className="order-success">
      <p>Cảm ơn bạn đã đặt hàng tại shop.</p>
      <p>
        Chúng tôi sẽ sớm liên hệ với với bạn qua số điện thoại bạn cung cấp để
        xác nhận đơn hàng trong 24 giờ tới
      </p>
      <div className="action-cart">
        <Button type="primary">
          <Link to={PRODUCTS_PATH}>Tiếp tục mua sắm</Link>
        </Button>
        <Button>
          <Link to={ROOT_PATH}>Quay về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}

export default OrderSuccess;
