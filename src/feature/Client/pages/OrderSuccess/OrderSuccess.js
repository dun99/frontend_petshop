import { Button } from "antd";
import { PRODUCTS_PATH, ROOT_PATH } from "constants/route";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.scss";

function OrderSuccess() {
  return (
    <div className="order-success">
      <p>Thank you for ordering at the shop.</p>
      <p>
        We will contact you shortly with the phone number you provided to order
        confirmation in next 24 hours
      </p>
      <div className="action-cart">
        <Button className="">
          <Link to={PRODUCTS_PATH}>Continue shopping</Link>
        </Button>
        <Button>
          <Link to={ROOT_PATH}>Back to home page</Link>
        </Button>
      </div>
    </div>
  );
}

export default OrderSuccess;
