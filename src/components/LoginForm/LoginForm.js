import React, { useEffect } from "react";
import { auth } from "feature/Auth/firebase";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, logoutRequest, setUserCurrent } from "redux/authSlice";
import authApi from "api/authApi";
import { Link } from "react-router-dom";
import { REGISTER_PATH } from "constants/route";

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

  if (!isAuth || !currentUser) {
    return (
      <div>
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

        <Button onClick={authApi.singinWithGoogle}>
          <GoogleOutlined />
          Signin with google
        </Button>
      </div>
    );
  }
  return (
    <div>
      <p>Welcome! {currentUser.email} You are now signed-in!</p>
      <a onClick={handleLogout}>Sign-out</a>
    </div>
  );
};
export default LoginForm;
