import { Button, Form, Input } from "antd";
import { ORDER_SUCCESS } from "constants/route";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeAllCart } from "redux/cartSlice";
import { createOrderRequest } from "redux/orderSlice";
import "./Order.scss";

function Order() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const order = {
      cart: cart,
      info: values,
      user: {
        id: currentUser.uid,
        email: currentUser.email,
      },
      orderStatus: "pending",
    };
    dispatch(createOrderRequest(order));
    dispatch(removeAllCart());
  };

  return (
    <div className="order">
      <div className="order-title">Thong tin khach hang</div>
      <div className="order-form">
        <Form
          name="complex-form"
          onFinish={onFinish}
          style={{ width: "50%" }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="Họ tên">
            <Form.Item
              name="name"
              noStyle
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Address">
            <Form.Item
              name="address"
              noStyle
              rules={[{ required: true, message: "Address is required" }]}
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
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Đặt hàng
              {order.status && <Redirect to={ORDER_SUCCESS} />}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Order;
