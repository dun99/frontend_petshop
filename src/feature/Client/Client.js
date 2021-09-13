import { Layout } from "antd";
import banner from "assets/images/banner.jpg";
import Banner from "components/Banner/Banner";
import FooterApp from "components/Footer/Footer";
import HeaderApp from "components/Header/Header";
import LoginForm from "components/LoginForm/LoginForm";
import Register from "components/LoginForm/Register";
import {
  CART_PATH,
  ORDER_HISTORY,
  ORDER_PATH,
  ORDER_SUCCESS,
  PRODUCTS_PATH,
  PRODUCT_DETAIL_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
} from "constants/route";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./Client.scss";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";

function Client() {
  const { Content } = Layout;
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <>
      <HeaderApp />
      <Banner banner={banner} />
      <Layout className="container main-page">
        <Content>
          <Switch>
            <Route path={ROOT_PATH} exact>
              <Home />
            </Route>
            <Route path={PRODUCTS_PATH}>
              <Products />
            </Route>
            <Route path={PRODUCT_DETAIL_PATH}>
              <Products />
            </Route>
            <Route path={CART_PATH}>
              <Cart />
            </Route>
            <Route path={REGISTER_PATH}>
              <Register />
            </Route>
            <Route
              path={SIGN_IN_PATH}
              render={() =>
                currentUser ? <Redirect to={PRODUCTS_PATH} /> : <LoginForm />
              }
            />
            <Route path={PROFILE_PATH}>
              <Profile />
            </Route>
            <Route path={ORDER_PATH}>
              <Order />
            </Route>
            <Route path={ORDER_SUCCESS}>
              <OrderSuccess />
            </Route>
            <Route path={ORDER_HISTORY}>
              <OrderHistory />
            </Route>
            <Route path="*">
              <div>404</div>
            </Route>
          </Switch>
        </Content>
      </Layout>
      <FooterApp />
    </>
  );
}

export default Client;
