import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { priceData } from "constants/FilterData";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changePrice } from "redux/productsSlice";

function Price() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();
  const gte = filters.price_gte;
  const lte = filters.price_lte;
  const ref_Gte = useRef(null);
  const ref_Lte = useRef(null);

  const handleChangePrice = (event) => {
    let gteData = event.target.getAttribute("gte");
    let lteData = event.target.getAttribute("lte");
    if (gteData || lteData) {
      const newFilter = {
        ...filters,
        price_gte: gteData,
        price_lte: lteData,
      };
      dispatch(changePrice(newFilter));
    } else {
      const newFilter = {
        ...filters,
        price_gte: ref_Gte.current.value,
        price_lte: ref_Lte.current.value,
      };
      dispatch(changePrice(newFilter));
    }
  };

  const displayPrice = (list) => {
    return list.map((item, index) => {
      return (
        <li
          className="category-item"
          key={index}
          gte={item.gte}
          lte={item.lte}
          onClick={handleChangePrice}
        >
          <span className="icon">
            <StarFilled />
          </span>
          {!item.gte
            ? `<$${item.lte}`
            : !item.lte
            ? `>$${item.gte}`
            : `$${item.gte}-${item.lte}`}
        </li>
      );
    });
  };

  return (
    <div className="price">
      <h1 className="title__filter category-title">Price</h1>
      <ul className="filter-price">
        <div className="filter__item brand__item">
          {displayPrice(priceData)}
        </div>
      </ul>
      <div className="prices-form mt-1">
        <span>{t("From")}</span>
        <input
          type="number"
          id="price-from"
          defaultValue={gte || ""}
          ref={ref_Gte}
        />
        <span>{t("To")}</span>
        <input
          type="number"
          id="price-to"
          defaultValue={lte || ""}
          ref={ref_Lte}
        />
        <Button onClick={handleChangePrice}>Go</Button>
      </div>
    </div>
  );
}

export default Price;
