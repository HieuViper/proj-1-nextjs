"use client";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useState } from "react";
const { Header, Sider, Content } = Layout;
const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function getItem(key, label, icon, children) {
    return {
      key,
      icon,
      label,
      children,
    };
  }
  const items = [
    getItem(
      "1",
      <Link href="/admin/products">Products</Link>,
      <MailOutlined />
    ),
    getItem(
      "98",
      <Link href="/admin/categories">Categories</Link>,
      <MailOutlined />
    ),
    getItem(
      "99",
      <Link href="/admin/news">News</Link>,
      <MailOutlined />
    ),
    getItem("2", "Test2", <AppstoreOutlined />, [
      getItem("3", <Link href="/admin/">test3</Link>),
      getItem("4", <Link href="/admin/">test4</Link>),
    ]),
    getItem("6", "test6", <SettingOutlined />, [
      getItem("7", <Link href="/admin/">test7</Link>),
      getItem("8", <Link href="/admin/">test8</Link>),
      getItem("9", <Link href="/admin/">test9</Link>),
      getItem("10", <Link href="/admin/">test10</Link>),
    ]),
  ];

  return (
    <Layout hasSider style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="sidebar-logo"
          style={{ paddingLeft: 25, paddingTop: 10, paddingBottom: 10 }}
        >
          <Link href="http://localhost:3000/admin" target="_blank">
            <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo" />
            {!collapsed && <h1>ADMIN DASHBOARD</h1>}
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "50px",
            }}
          >
            <Avatar icon={<UserOutlined />} />
            <span style={{ padding: 5 }}>Login</span>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
