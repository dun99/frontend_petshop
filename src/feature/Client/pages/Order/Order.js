import { Button, Form, Input } from "antd";
import { ORDER_SUCCESS } from "constants/route";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeAllCart } from "redux/cartSlice";
import { createOrderRequest } from "redux/ordersSlice";
import "./Order.scss";
import { useHistory } from "react-router-dom";

function Order() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const onFinish = (values) => {
    const items = [];
    let totalQuantity = 0;
    cart.cartItem.forEach((product) => {
      const temp = {
        item: product._id,
        quantity: product.quantity,
        price: product.price,
      };
      items.push(temp);
    });
    cart.cartItem.forEach((product) => {
      totalQuantity += product.quantity;
    });
    const order = {
      orderTotalQuantity: totalQuantity,
      orderTotalAmount: cart.cartTotalAmount,
      info: values,
      user: currentUser && currentUser._id ? currentUser._id : "unknown",
      orderStatus: "pending",
      createAt: Date.now(),
      items,
    };

    dispatch(createOrderRequest(order));

    dispatch(removeAllCart());
    history.push(ORDER_SUCCESS);
  };

  return (
    <div className="order">
      <div className="order-form">
        <h1 className="order-title">{t("orderInformation")}</h1>
        <Form
          name="complex-form"
          onFinish={onFinish}
          style={{ width: "50%" }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label={t("firstName")}>
            <Form.Item
              name="firstName"
              noStyle
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item label={t("lastName")}>
            <Form.Item
              name="lastName"
              noStyle
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item label={t("city")}>
            <Form.Item
              name="city"
              noStyle
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item label={t("district")}>
            <Form.Item
              name="district"
              noStyle
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="note" label={t("detailAddress")}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            {/* <Link to={ORDER_SUCCESS}> */}
            <Button type="primary" htmlType="submit" className="order-btn">
              {t("Order")}
            </Button>
            {/* </Link> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Order;
