import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { PRODUCTS_PATH } from "constants/route";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "redux/cartSlice";
import { formatMoney } from "util/formatMoney";
import "./Product.scss";

function Product(props) {
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
          Thêm vào giỏ
        </ShoppingCartOutlined>,
        <div>Mua ngay</div>,
        <div>
          <Link to={`${PRODUCTS_PATH}/${product.id}`}>Xem chi tiết </Link>
        </div>,
      ]}
    >
      {product.free_shipping && (
        <Tag className="freeship-tag" color="red">
          Freeship
        </Tag>
      )}
      <div className="product-title">{product.name}</div>
      <div className="product-price">{formatMoney(product.price)}</div>
    </Card>
  );
}

export default Product;
