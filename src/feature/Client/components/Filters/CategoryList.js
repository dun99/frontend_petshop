import React from "react";
import CategoryItem from "./CategoryItem";

function CategoryFilter(props) {
  const renderCategory = (list) => {
    return list.map((item, index) => {
      return <CategoryItem name={item.name} key={index} />;
    });
  };
  return <>{renderCategory(props.categories)}</>;
}

export default CategoryFilter;
