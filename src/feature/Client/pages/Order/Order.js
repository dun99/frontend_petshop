import { Button, Form, Input } from "antd";
import { ORDER_SUCCESS } from "constants/route";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeAllCart } from "redux/cartSlice";
import { createOrderRequest } from "redux/orderSlice";
import "./Order.scss";
import { useTranslation } from "react-i18next";

function Order() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onFinish = (values) => {
    const order = {
      cart: cart,
      info: values,
      user: {
        id: currentUser.uid,
        email: currentUser.email,
      },
      orderStatus: "pending",
      createAt: Date.now(),
    };
    dispatch(createOrderRequest(order));
    dispatch(removeAllCart());
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
            <Button type="primary" htmlType="submit" className="order-btn">
              {t("Order")}
              {order.status && <Redirect to={ORDER_SUCCESS} />}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Order;
