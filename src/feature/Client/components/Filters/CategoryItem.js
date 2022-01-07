import { StarFilled } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "redux/productsSlice";

function CategoryItem(props) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const handleChangeCategory = (name) => {
    const newFilters = {
      ...filters,
      category: name,
    };
    dispatch(changeCategory(newFilters));
  };

  return (
    <div
      onClick={() => handleChangeCategory(props.id)}
      className={`category-item ${
        filters.category === props.id ? "active" : ""
      }`}
    >
      <span className="icon">
        <StarFilled />
      </span>
      {props.name}
    </div>
  );
}

export default CategoryItem;
