import { Button } from "antd";
import { PRODUCTS_PATH } from "constants/route";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseCart, increaseCart, removeCart } from "redux/cartSlice";
import "./CartItem.scss";

function CartItem(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = parseFloat(
      (product.price * product.quantity).toFixed(2)
    );
    settotalPrice(totalPrice);
  }, [product]);

  const handleDecrease = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncrease = (product) => {
    dispatch(increaseCart(product));
  };

  const handleRemove = (product) => {
    dispatch(removeCart(product));
  };
  return (
    <tr className="cart-item">
      <td>
        <Link to={`${PRODUCTS_PATH}/${product.id}`}>
          <img src={product.image} />
        </Link>
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <div className="quantity">
          <Button
            className="action-btn"
            onClick={() => handleDecrease(product)}
          >
            -
          </Button>
          <input className="quantity-input" value={product.quantity} />
          <Button
            className="action-btn"
            onClick={() => handleIncrease(product)}
          >
            +
          </Button>
        </div>
      </td>
      <td>{totalPrice}</td>
      <td>
        <span onClick={() => handleRemove(product)}>Xóa</span>
      </td>
    </tr>
  );
}

export default CartItem;
