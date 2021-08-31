import React from "react";
import "./Banner.scss";

function Banner(props) {
  return (
    <div className="banner">
      <img src={props.banner} alt="banner"></img>
    </div>
  );
}

export default Banner;
