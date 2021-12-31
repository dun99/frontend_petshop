import { Button, Col, Comment, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { PRODUCTS_PATH } from "constants/route";
import CommentInput from "feature/Client/components/Comment/CommentInput";
import CommentList from "feature/Client/components/Comment/CommentList";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "redux/cartSlice";
import { createCommentRequest, fetchCommentRequest } from "redux/commentSlice";
import { getProductById } from "redux/productDetailSlice";
import { fetchUserById } from "redux/userSlice";
import { formatMoney } from "util/formatMoney";
import "./ProductDetail.scss";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);
  const comments = useSelector((state) => state.comments.list);
  const [submitting, setsubmitting] = useState(false);
  const [value, setvalue] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.users.user);
  const { t } = useTranslation();
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      dispatch(fetchUserById(currentUser.uid));
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getProductById(id));
    // dispatch(
    //   fetchCommentRequest({
    //     productId: id,
    //   })
    // );
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setsubmitting(true);
    setTimeout(() => {
      setsubmitting(false);
      setvalue("");
      dispatch(
        createCommentRequest({
          productId: product._id,
          author: currentUser.uid,
          content: value,
          avatar: user.avatar,
          account: user.email,
        })
      );
    }, 5000);
  };

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  return (
    <div className="product-detail">
      <ToastContainer />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} xl={12} className="product-detail-item">
          <img src={product.image} alt="product image" />
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <div className="product-detail-name">{product.name}</div>
          <div className="product-detail-price">
            {product.price && formatMoney(product.price)}
          </div>
          <p className="product-detail-desc">{product.desc}</p>
          <div className="product-detail-quantity">
            <span>{t("Quantity")} </span>
            <span>{product.quantity}</span>
          </div>
          <div className="product-detail-action">
            <Button onClick={() => handleAddToCart(product)}>
              {t("Add to cart")}
            </Button>
            <Button>{t("Buy Now")}</Button>
            <Button>
              <Link to={PRODUCTS_PATH}>{t("Continue shopping")}</Link>
            </Button>
          </div>
        </Col>
      </Row>

      <div className="comments">
        {comments.length > 0 && (
          <>
            <CommentList comments={comments} user={user} />
          </>
        )}
        <Comment
          avatar={<Avatar src={user.avatar} alt="User" />}
          content={
            <CommentInput
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    </div>
  );
}

export default ProductDetail;
