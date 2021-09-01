import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import "./Product.scss";

function Product(props) {
  const { product } = props;

  return (
    <Card
      className="product-card"
      cover={<img alt="product image" src={product.image} />}
      actions={[
        <ShoppingCartOutlined key="cart">Thêm vào giỏ</ShoppingCartOutlined>,
        <div>Mua ngay</div>,
        <div>Xem chi tiết</div>,
      ]}
    >
      <div className="product-title">{product.name}</div>
      <div className="product-price">{product.price}</div>
    </Card>
  );
}

export default Product;
