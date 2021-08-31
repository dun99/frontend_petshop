import { Layout } from "antd";
import banner from "assets/images/banner.jpg";
import Banner from "components/Banner/Banner";
import FooterApp from "components/Footer/Footer";
import HeaderApp from "components/Header/Header";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Client.scss";
import Home from "./Home/Home";
import Products from "./Products/Products";

function Client() {
  const { Content } = Layout;

  return (
    <BrowserRouter>
      <HeaderApp />
      <Banner banner={banner} />
      <Layout className="container">
        <Content>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/products">
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
