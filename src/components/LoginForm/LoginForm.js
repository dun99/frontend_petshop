import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import authApi from "api/authApi";
import Banner from "components/Banner/Banner";
import FooterApp from "components/Footer/Footer";
import HeaderApp from "components/Header/Header";
import {
  ADMIN_PATH,
  ADMIN_PRODUCTS_PATH,
  REGISTER_PATH,
  ROOT_PATH,
} from "constants/route";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchUserById, loginRequest } from "redux/authSlice";
import { checkRole } from "util/isLoggined";
import "./loginForm.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const onFinish = async (values) => {
    await dispatch(
      loginRequest({
        email: values.email,
        password: values.password,
      })
    );
    const role = checkRole();
    if (role === "customer") history.push(ROOT_PATH);
    if (role === "admin") history.push(ADMIN_PRODUCTS_PATH);
  };

  const signinWithGoogle = async () => {
    await dispatch(signinWithGoogle());
    const role = checkRole();
    if (role === "customer") history.push(ROOT_PATH);
    if (role === "admin") history.push(ADMIN_PRODUCTS_PATH);
  };

  // useEffect(() => {
  //   const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
  //     dispatch(setUserCurrent(user));
  //   });
  //   unregisterAuthObserver();
  // }, [currentUser]);

  return (
    <>
      <HeaderApp />
      <Banner />
      <div className="login-form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to={REGISTER_PATH}>Register now</Link>
          </Form.Item>
        </Form>

        <Button className="google" onClick={signinWithGoogle}>
          <GoogleOutlined />
          Signin with google
        </Button>
      </div>
      <FooterApp />
    </>
  );
};

export default LoginForm;
