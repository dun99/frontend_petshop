import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  ADMIN_ORDER_PATH,
  ADMIN_PATH,
  ADMIN_PRODUCTS_PATH,
} from "constants/route";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="dashboard">
      <Menu
        className="nav"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={ADMIN_PATH}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to={ADMIN_PRODUCTS_PATH}>Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to={ADMIN_ORDER_PATH}>Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
