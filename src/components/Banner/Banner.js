import { Carousel } from "antd";
import React from "react";
import "./Banner.scss";

function Banner() {
  return (
    <div className="banner">
      <Carousel autoplay dots={false}>
        <div className="image-slider">
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-f01af.appspot.com/o/T9_Banner%20web.png?alt=media&token=f36660c6-5b50-4194-a4b8-8ea2e0ef93c1" />
        </div>
        <div className="image-slider">
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-f01af.appspot.com/o/__Banner%20web%20mo%CC%9B%CC%89%20cu%CC%9B%CC%89a%20M5.png?alt=media&token=005a510c-712a-4831-aa45-a8852d4176e3" />
        </div>
        <div className="image-slider">
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-f01af.appspot.com/o/sb_1612181109_394.png?alt=media&token=439835f8-a424-46cb-8c6c-79cbedd21a09" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
