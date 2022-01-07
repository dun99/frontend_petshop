import { Col, Empty, Input, Row, Spin } from "antd";
import BackTopApp from "components/BackTop/BackTop";
import PaginationApp from "components/Pagination/Pagination";
import Product from "components/Product/Product";
import { categoryList } from "constants/FilterData";
import CategoryFilter from "feature/Client/components/Filters/CategoryList";
import Price from "feature/Client/components/Filters/Price";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategoriesRequest } from "redux/categoriesSlice";
import { fetchProductsRequest, searchName } from "redux/productsSlice";
import "./Products.scss";
const { Search } = Input;

function Products() {
  const dispatch = useDispatch();

  const { filters, list, count, isLoading } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);
  const typingTimeout = useRef(null); // debouce search
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    // dispatch(fetchProductsRequest(filters));
    setTimeout(() => {
      dispatch(fetchProductsRequest(filters));
      // setIsLoading(false);
    }, 1000);
  }, [filters]);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [filters]);

  const renderProduct = () => {
    return list.map((product, index) => {
      return (
        <Col xs={24} sm={12} md={12} xl={8}>
          <Product key={index} product={product} />
        </Col>
      );
    });
  };

  const handleSearch = (value) => {
    dispatch(searchName(value));
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      dispatch(searchName(value));
    }, 1000);
  };

  return (
    <div className="products-list">
      <div className="search">
        <Search
          style={{ width: 400 }}
          placeholder="search name"
          onSearch={handleSearch}
          onChange={handleChangeSearch}
          allowClear
          enterButton
        />
      </div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={4} className="gutter-row">
          <CategoryFilter categories={categories} />
          {/* <Price /> */}
        </Col>
        {isLoading ? (
          <div className="loading">
            <Spin size={"large"} />
          </div>
        ) : list.length === 0 ? (
          <Empty />
        ) : (
          <Col xs={24} sm={24} md={20} className="gutter-row">
            <Row gutter={[16, 16]}>{renderProduct()}</Row>
            <Row className="paginations">
              <PaginationApp totalCount={count} />
            </Row>
            <BackTopApp />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Products;
