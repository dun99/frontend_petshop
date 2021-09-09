
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import {
  CART_PATH,
  PRODUCTS_PATH,
  REGISTER_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
} from "constants/route";
import { auth } from "feature/Auth/firebase";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequest, setUserCurrent } from "redux/authSlice";
import { totalCart } from "redux/cartSlice";
import "./Header.scss";
const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderApp() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartTotalQuantity);
  const cart = useSelector((state) => state.cart.cartItem);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(totalCart());
  }, [cartCount, cart]);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      dispatch(setUserCurrent(user));
    });
    return () => unregisterAuthObserver();
  }, [currentUser]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div className="header-wrapper">
      <div className="header container">
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
                <Link to={CART_PATH} />
                <span className="cart-icon">
                  <ShoppingCartOutlined />
                  <span className="count-cart">{cartCount}</span>
                </span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title={currentUser ? currentUser.email : "Account"}
                className="account"
              >
                {!isAuth || !currentUser ? (
                  <>
                    <Menu.Item key="1">
                      Đăng ký
                      <Link to={REGISTER_PATH} />
                    </Menu.Item>
                    <Menu.Item key="2">
                      Đăng nhập
                      <Link to={SIGN_IN_PATH} />
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item key="2">
                      <a onClick={handleLogout}>Đăng xuất</a>
                    </Menu.Item>
                    <Menu.Item key="3">Thông tin tài khoản</Menu.Item>
                    <Menu.Item key="4">Lịch sử đơn hàng</Menu.Item>
                  </>
                )}
              </SubMenu>
            </Menu>
          </Header>
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
