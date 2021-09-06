import { Col, Empty, Row } from "antd";
import BackTopApp from "components/BackTop/BackTop";
import PaginationApp from "components/Pagination/Pagination";
import Product from "components/Product/Product";
import { categoryList } from "constants/FilterData";
import CategoryFilter from "feature/Client/components/Filters/CategoryList";
import Price from "feature/Client/components/Filters/Price";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "redux/productsSlice";
import "./Products.scss";

function Products() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const products = useSelector((state) => state.products.list);
  const totalCount = useSelector((state) => state.products.count);

  useEffect(() => {
    dispatch(fetchProductsRequest(filters));
  }, [filters]);

  const renderProduct = (list) => {
    return list.map((product, index) => {
      return (
        <Col xs={24} sm={12} md={12} xl={8}>
          <Product key={index} product={product} />
        </Col>
      );
    });
  };

  return (
    <div className="products-list">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={4} className="gutter-row">
          <CategoryFilter categories={categoryList} />
          <Price />
        </Col>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <Col xs={24} sm={24} md={20} className="gutter-row">
            <Row gutter={[16, 16]}>{renderProduct(products)}</Row>
            <Row className="paginations">
              <PaginationApp totalCount={totalCount} />
            </Row>
            <BackTopApp />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Products;
