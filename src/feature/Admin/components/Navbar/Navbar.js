import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import {
  ADMIN_ORDER_PATH,
  ADMIN_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_USERS_PATH,
} from "constants/route";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="dashboard-nav">
      <Menu className="nav" mode="inline" theme="dark" defaultSelectedKeys="1">
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
          <Link to={ADMIN_USERS_PATH}>Users</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
