import { Layout } from "antd";
import banner from "assets/images/banner.jpg";
import Banner from "components/Banner/Banner";
import FooterApp from "components/Footer/Footer";
import HeaderApp from "components/Header/Header";
import { PRODUCTS_PATH, ROOT_PATH } from "constants/route";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Client.scss";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";

function Client() {
  const { Content } = Layout;

  return (
    <BrowserRouter>
      <HeaderApp />
      <Banner banner={banner} />
      <Layout className="container main-page">
        <Content>
          <Switch>
            <Route path={ROOT_PATH} exact>
              <Home />
            </Route>
            <Route path={PRODUCTS_PATH} exact>
              <Products />
            </Route>
          </Switch>
        </Content>
      </Layout>
      <FooterApp />
    </BrowserRouter>
  );
}

export default Client;
