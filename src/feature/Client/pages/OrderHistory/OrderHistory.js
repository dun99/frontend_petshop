import OrderItem from "feature/Client/components/OrderItem.js/OrderItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistoryRequest } from "redux/orderHistorySlice";
import "./OrderHistory.scss";
import { useTranslation } from "react-i18next";
function OrderHistory() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const ordersHistory = useSelector((state) => state.ordersHistory.list);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchOrderHistoryRequest(currentUser._id));
  }, []);

  const renderOrder = (list) => {
    return list.map((item) => {
      return <OrderItem order={item} />;
    });
  };

  return (
    <div className="order-history">
      <table>
        <thead>
          <th>{t("Product")}</th>
          <th>{t("Description")}</th>
          <th>{t("Price")}</th>
          <th>{t("Quantity")}</th>
          <th>{t("Total")}</th>
        </thead>
        <tbody>{renderOrder(ordersHistory)}</tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
