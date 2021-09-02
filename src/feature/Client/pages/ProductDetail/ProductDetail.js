import { Button, Col, Row } from "antd";
import { PRODUCTS_PATH } from "constants/route";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "redux/productDetailSlice";
import "./ProductDetail.scss";

function ProductDetail({ match }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);
  const [quantity, setquantity] = useState(0);

  useEffect(() => {
    dispatch(getProductById(match.params.id));
    const total = totalItem(product.sizes);
    setquantity(total);
  }, []);

  const totalItem = (list = []) => {
    if (list) {
      list.reduce((sum, current) => sum + current.quantity, 0);
    }
  };

  const handleDisplayQuantity = (item) => {
    setquantity(item.quantity);
  };

  const renderType = (list = []) => {
    if (list) {
      return list.map((item) => {
        return (
          <Button onClick={() => handleDisplayQuantity(item)}>
            {item.name}
          </Button>
        );
      });
    }
  };
  return (
    <div className="product-detail">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} xl={12} className="product-detail-item">
          <img src={product.image} alt="product image" />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <div className="product-detail-name">{product.name}</div>
          <div className="product-detail-price">{product.price}</div>
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-quantity">
            <span>Số lượng: </span>
            <span>{quantity}</span>
          </div>
          <div className="product-detail-type">{renderType(product.sizes)}</div>
          <div className="product-detail-action">
            <Button>Thêm vào giỏ hàng</Button>
            <Button>Mua ngay</Button>
            <Button>
              <Link to={PRODUCTS_PATH}>Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
