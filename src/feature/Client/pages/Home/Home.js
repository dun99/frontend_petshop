import { Col, Empty, Row } from "antd";
import BackTopApp from "components/BackTop/BackTop";
import Product from "components/Product/Product";
import SliderImage from "components/Slider/Slider";
import { sliderCategories } from "constants/FilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchProductsRequest } from "redux/productsSlice";
import "./Home.scss";
function Home() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const products = useSelector((state) => state.products.list);
  useEffect(() => {
    dispatch(fetchProductsRequest(filters));
  }, [filters]);

  const renderProduct = (list) => {
    return list.map((product, index) => {
      return (
        <Col xs={24} sm={12} md={12} xl={6}>
          <Product key={index} product={product} />
        </Col>
      );
    });
  };

  const renderProductFreeship = (list) => {
    return list.map((product, index) => {
      if (product.free_shipping === true) {
        return (
          <Col xs={24} sm={12} md={12} xl={6}>
            <Product key={index} product={product} />
          </Col>
        );
      }
    });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="products-list">
      <ToastContainer autoClose={3000} />
      <h2 className="category-name">Sản phẩm mới</h2>
      <Row gutter={24}>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <Col xs={24} sm={24} md={24} className="gutter-row">
            <Row gutter={[16, 16]}>{renderProduct(products)}</Row>
          </Col>
        )}
      </Row>
      <h2 className="category-name">Sản phẩm freeship</h2>
      <Row gutter={24}>
        {products.length === 0 ? (
          <Empty />
        ) : (
          <Col xs={24} sm={24} md={24} className="gutter-row">
            <Row gutter={[16, 16]}>{renderProductFreeship(products)}</Row>
            <BackTopApp />
          </Col>
        )}
      </Row>
      <SliderImage
        className="slider"
        setting={settings}
        data={sliderCategories}
      ></SliderImage>
    </div>
  );
}

export default Home;
