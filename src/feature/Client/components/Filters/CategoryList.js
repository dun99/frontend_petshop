import React from "react";
import { useTranslation } from "react-i18next";
import CategoryItem from "./CategoryItem";
import "./Filter.scss";

function CategoryFilter(props) {
  console.log(props);
  const { t } = useTranslation();
  const renderCategory = (list) => {
    return list.map((item, index) => {
      console.log("kk", item);
      return <CategoryItem name={item.name} id={item._id} key={index} />;
    });
  };

  return (
    <>
      <div className="category-title">{t("Categories")}</div>
      {renderCategory(props.categories)}
    </>
  );
}

export default CategoryFilter;
