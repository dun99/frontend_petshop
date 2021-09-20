import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import authApi from "api/authApi";
import Banner from "components/Banner/Banner";
import HeaderApp from "components/Header/Header";
import { REGISTER_PATH, ROOT_PATH } from "constants/route";
import { auth } from "feature/Auth/firebase";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginRequest, logoutRequest, setUserCurrent } from "redux/authSlice";
import "./loginForm.scss";
const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const onFinish = (values) => {
    dispatch(
      loginRequest({
        email: values.email,
        password: values.password,
      })
    );
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      dispatch(setUserCurrent(user));
    });
    unregisterAuthObserver();
  }, [currentUser]);

  // if (!isAuth || !currentUser) {
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
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

        <Button className="google" onClick={authApi.singinWithGoogle}>
          <GoogleOutlined />
          Signin with google
        </Button>
      </div>
    </>
  );
  // }
  // return <Redirect to={ROOT_PATH} />;
};
export default LoginForm;
