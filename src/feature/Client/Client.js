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
  REGISTER_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
} from "constants/route";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./Client.scss";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";

function Client() {
  const { Content } = Layout;
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <BrowserRouter>
      <HeaderApp />
      <Banner banner={banner} />
      <Layout className="container main-page">
        <Content>
          <Switch>
            <Route path={ROOT_PATH} exact component={Home} />
            <Route path={PRODUCTS_PATH} exact component={Products} />
            <Route path={PRODUCT_DETAIL_PATH} component={ProductDetail} />
            <Route path={CART_PATH} exact component={Cart} />
            <Route path={REGISTER_PATH} exact component={Register} />
            <Route
              exact
              path={SIGN_IN_PATH}
              render={() =>
                currentUser ? <Redirect to={PRODUCTS_PATH} /> : <LoginForm />
              }
            />
            <Route path={ORDER_PATH} exact component={Order} />
            <Route path={ORDER_SUCCESS} exact component={OrderSuccess} />
            <Route path={ORDER_HISTORY} exact component={OrderHistory} />
          </Switch>
        </Content>
      </Layout>
      <FooterApp />
    </BrowserRouter>
  );
}

export default Client;
