import { Button, Empty } from "antd";
import { ORDER_PATH, ROOT_PATH } from "constants/route";
import CartItem from "feature/Client/components/CartItem/CartItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { totalCart } from "redux/cartSlice";
import { formatMoney } from "util/formatMoney";
import "./Cart.scss";
import { useTranslation } from "react-i18next";

function Cart() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cartItem);
  const amount = useSelector((state) => state.cart.cartTotalAmount);

  useEffect(() => {
    dispatch(totalCart());
  }, [cart, amount]);

  const renderCart = (list) => {
    return list.map((item, index) => {
      return <CartItem product={item} key={index} />;
    });
  };
  if (cart.length > 0) {
    return (
      <div className="cart-table">
        <ToastContainer autoClose={2000} />
        <table>
          <thead>
            <th>{t("Products")}</th>
            <th>{t("Description")}</th>
            <th>{t("Price")}</th>
            <th>{t("QUantity")}</th>
            <th>{t("Total")}</th>
            <th>{t("Action")}</th>
          </thead>
          <tbody>{renderCart(cart)}</tbody>
        </table>
        <div className="cart-desc">
          <p>{t("freeShipContent")}</p>
          <p>{t("shipForAllCity")}</p>
          <p>{t("warningContent")}</p>
        </div>
        <div className="total-cart">
          <span>{t("Total")}: </span>
          <span>{formatMoney(amount)}</span>
        </div>
        <div className="action-cart">
          <Button>
            <Link to={ROOT_PATH}>{t("Continue shopping")}</Link>
          </Button>
          <Button className="buy-now-btn">
            <Link to={ORDER_PATH}>{t("Buy Now")}</Link>
          </Button>
        </div>
      </div>
    );
  }
  return <Empty />;
}

export default Cart;
