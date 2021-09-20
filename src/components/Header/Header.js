import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Banner from "components/Banner/Banner";
import {
  ADMIN_PATH,
  CART_PATH,
  ORDER_HISTORY,
  PRODUCTS_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
} from "constants/route";
import { auth } from "feature/Auth/firebase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequest, logoutRequest, setUserCurrent } from "redux/authSlice";
import { totalCart } from "redux/cartSlice";
import { fetchUserById } from "redux/userSlice";
import "./Header.scss";
const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderApp() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartTotalQuantity);
  const cart = useSelector((state) => state.cart.cartItem);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.users.user);
  const { t, i18n } = useTranslation();

  const userInfo = useSelector((state) => state.users.user);
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      dispatch(fetchUserById(currentUser.uid));
    }
  }, [currentUser, userInfo.id]);

  useEffect(() => {
    dispatch(totalCart());
  }, [cartCount, cart]);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      dispatch(setUserCurrent(user));
    });
    return () => unregisterAuthObserver();
  }, [currentUser, user.email]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="header-top">
          <div class="container">
            <div class="row">
              <div class="col about-us">
                <span class="">
                  <Link to="#">{t("Store")}</Link>
                </span>
                <span class="">
                  <Link to="#">{t("About us")}</Link>
                </span>
                <span class="">
                  <Link to="#">{t("Recruitment")}</Link>
                </span>
              </div>
            </div>
            <div>
              <Button onClick={() => changeLanguage("en")}>en</Button>
              <Button onClick={() => changeLanguage("vi")}>vi</Button>
            </div>
          </div>
        </div>
        <div className="header-main">
          <Header>
            <Menu
              mode="horizontal"
              breakpoint="xl"
              className="container menu"
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
              {currentUser && user.role === "admin" && (
                <Menu.Item key="products1">
                  Management
                  <Link to={ADMIN_PATH} />
                </Menu.Item>
              )}
              <Menu.Item key="cart">
                <Link to={CART_PATH} />
                <span className="cart-icon">
                  <ShoppingCartOutlined />
                  <span className="count-cart">{cartCount}</span>
                </span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title={currentUser ? currentUser.email : `${t("Account")}`}
                className="account"
              >
                {!isAuth || !currentUser ? (
                  <>
                    <Menu.Item key="1">
                      {t("Signup")}
                      <Link to={REGISTER_PATH} />
                    </Menu.Item>
                    <Menu.Item key="2">
                      {t("Login")}
                      <Link to={SIGN_IN_PATH} />
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item key="2">
                      <a onClick={handleLogout}>{t("Logout")}</a>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={PROFILE_PATH}>{t("Info")}</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to={ORDER_HISTORY}>{t("Orders")}</Link>
                    </Menu.Item>
                  </>
                )}
              </SubMenu>
            </Menu>
            <Banner />
          </Header>
        </div>
      </div>
    </header>
  );
}

export default HeaderApp;
