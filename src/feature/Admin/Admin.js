import { Layout } from "antd";
import FooterApp from "components/Footer/Footer";
import {
  ADMIN_ORDER_PATH,
  ADMIN_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_USERS_PATH,
} from "constants/route";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Admin.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import ProductsManagement from "./pages/ProductsManagement/ProductsManagement";
import UserManagement from "./pages/UserManagement/UserManagement";

function Admin() {
  const { Content } = Layout;

  return (
    <>
      <div className="dashboard">
        <div className="nav">
          <Navbar />
        </div>
        <div className="content">
          <Layout className="main-page">
            <Content>
              <Switch>
                <Route path={ADMIN_PATH} exact>
                  <Home />
                </Route>
                <Route path={ADMIN_PRODUCTS_PATH}>
                  <ProductsManagement />
                </Route>
                <Route path={ADMIN_ORDER_PATH}>
                  <OrderManagement />
                </Route>
                <Route path={ADMIN_USERS_PATH}>
                  <UserManagement />
                </Route>
                <Route path="*">
                  <div>404</div>
                </Route>
              </Switch>
            </Content>
          </Layout>
        </div>
      </div>
      <FooterApp />
    </>
  );
}

export default Admin;
