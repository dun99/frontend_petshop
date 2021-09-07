import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import { PRODUCTS_PATH } from "constants/route";

function Product(props) {
  const { product } = props;

  return (
    <Card
      className="product-card"
      cover={<img alt="product image" src={product.image} />}
      actions={[
        <ShoppingCartOutlined key="cart">Thêm vào giỏ</ShoppingCartOutlined>,
        <div>Mua ngay</div>,
        <div>
          <Link to={`${PRODUCTS_PATH}/${product.id}`}>Xem chi tiết </Link>
        </div>,
      ]}
    >
      <div className="product-title">{product.name}</div>
      <div className="product-price">{product.price}</div>
    </Card>
  );
}

export default Product;
