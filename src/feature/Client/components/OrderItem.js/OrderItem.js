import React from "react";
import { formatMoney } from "util/formatMoney";
import OrderDetail from "./OrderDetail";
import "./OrderItem.scss";
import { useTranslation } from "react-i18next";

function OrderItem(props) {
  const { t } = useTranslation();
  const { order } = props;

  const renderCart = (list) => {
    return list.map((item, index) => {
      return <OrderDetail product={item} key={index} />;
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <>{t("Pending")}</>;
      case "confirm":
        return <>{t("Confirm")}</>;
      case "shipping":
        return <>{t("Shipping")}</>;
      case "success":
        return <>{t("Success")}</>;
      default:
        return <>{t("Pending")}</>;
    }
  };

  return (
    <>
      {renderCart(order.items)}
      <div className="status">
        <span className="status-title">{t("Status")}: </span>
        {renderStatus(order.orderStatus)}
      </div>
      <div className="status total">
        <span className="status-title">{t("Total")} :</span>
        <span>{formatMoney(order.totalAmount)}</span>
      </div>
    </>
  );
}

export default OrderItem;
