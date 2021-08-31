import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { ROOT_PATH, PRODUCTS_PATH } from "constants/route";
const { Header } = Layout;

function HeaderApp() {
  return (
    <div>
      <div className="header-top"></div>
      <div className="header-main">
        <Header>
          <Menu
            mode="horizontal"
            theme="dark"
            breakpoint="lg"
            className="container"
            overflowedIndicator={<MenuOutlined />}
          >
            <Menu.Item key="home">
              Trang chủ
              <Link to={ROOT_PATH} />
            </Menu.Item>
            <Menu.Item key="products">
              Sản phẩm
              <Link to={PRODUCTS_PATH} />
            </Menu.Item>
            <Menu.Item key="cart">
              <ShoppingCartOutlined />
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    </div>
  );
}

export default HeaderApp;
