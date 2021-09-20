import { PRODUCTS_PATH } from "constants/route";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderDetail(props) {
  const { product } = props;
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    const totalItem = parseFloat((product.price * product.quantity).toFixed(2));
    settotalPrice(totalItem);
  }, [product]);

  return (
    <tr className="order">
      <td>
        <Link to={`${PRODUCTS_PATH}/${product.id}`}>
          <img src={product.image} atl={product.image}/>
        </Link>
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <div className="quantity">{product.quantity}</div>
      </td>
      <td>{totalPrice}</td>
    </tr>
  );
}

export default OrderDetail;
