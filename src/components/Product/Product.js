import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { PRODUCTS_PATH } from "constants/route";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "redux/cartSlice";
import { formatMoney } from "util/formatMoney";
import { useTranslation } from "react-i18next";
import "./Product.scss";

function Product(props) {
  const { t } = useTranslation();
  const { product } = props;
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <Card
      className="product-card"
      cover={<img alt="product image" src={product.image} />}
      actions={[
        <ShoppingCartOutlined
          key="cart"
          onClick={() => handleAddToCart(product)}
        >
          {t("Add to cart")}
        </ShoppingCartOutlined>,

        <div>
          <Link to={`${PRODUCTS_PATH}/${product._id}`}>{t("Detail")} </Link>
        </div>,
      ]}
    >
      {product.freeShipping && product.status === "In stock" && (
        <Tag className="freeship-tag" color="blue">
          {t("freeShip")}
        </Tag>
      )}
      {product.status === "Out of stock" && (
        <Tag className="status-tag" color="red">
          {t(`${product.status}`)}
        </Tag>
      )}
      <div className="product-title">{product.name}</div>
      <div className="product-price">{formatMoney(product.price)}</div>
    </Card>
  );
}

export default Product;
