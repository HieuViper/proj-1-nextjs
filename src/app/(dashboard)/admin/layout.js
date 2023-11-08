"use client";
import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ContentLayout from "@/components/ContentLayout";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let location = usePathname();

  const [current, setCurrent] = useState(
    location === "/" || location === "" ? "/" : location
  );
  //or simply use const [current, setCurrent] = useState(location)

  useEffect(() => {
    if (location) {
      if (location.includes("news")) {
        setCurrent("news");
      }
      if (location.includes("news_categories")) {
        setCurrent("news_categories");
      }

      if (location.includes("articles")) {
        setCurrent("articles");
      }
      if (location.includes("article")) {
        setCurrent("article_categories");
      }
      if (location.includes("tags")) {
        setCurrent("tags");
      }
    }
  }, [location, current]);

  function getItem(key, label, icon, children) {
    return {
      key,
      icon,
      label,
      children,
    };
  }
  const items = [


    getItem("news", <Link href="/admin/news">News</Link>, <MailOutlined />),
    getItem(
      "news_categories",
      <Link href="/admin/news_categories">News Categories</Link>,
      <MailOutlined />
    ),
    getItem(
      "articles",
      <Link href="/admin/articles">Articles</Link>,
      <MailOutlined />
    ),
    getItem(
      "article_categories",
      <Link href="/admin/article_categories">Article Categories</Link>,
      <MailOutlined />
    ),
    getItem("tags", <Link href="/admin/tags">Tags</Link>, <MailOutlined />),
  ];

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
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
          // defaultSelectedKeys={["news"]}
          selectedKeys={[current]}
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
