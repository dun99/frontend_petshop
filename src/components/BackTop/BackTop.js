import React from "react";
import { BackTop } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import "./BackTop.scss";
function BackTopApp() {
  return (
    <BackTop className="backtop">
      <VerticalAlignTopOutlined />
    </BackTop>
  );
}

export default BackTopApp;
