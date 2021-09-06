import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { PRODUCTS_PATH, ROOT_PATH } from "constants/route";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useTranslation } from "react-i18next";
const { Header } = Layout;

function HeaderApp() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <div className="header-top">
        <Button onClick={() => changeLanguage("en")}>en</Button>
        <Button onClick={() => changeLanguage("vi")}>vi</Button>
      </div>
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
              {t("Home")}
              <Link to={ROOT_PATH} />
            </Menu.Item>
            <Menu.Item key="products">
              {t("Product")}
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
