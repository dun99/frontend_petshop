import React from "react";
import Slider from "react-slick";
import "./Slider.scss";
function SliderImage(props) {
  const renderSlider = (list = []) => {
    return list.map((item, index) => {
      return (
        <div className="slide-item">
          <img data-sizes="auto" src={item.image} alt={item.image} />
          <div className="text-middle">
            <div className="text">{item.text}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <Slider className="slider" {...props.setting}>
      {renderSlider(props.data)}
    </Slider>
  );
}

export default SliderImage;
