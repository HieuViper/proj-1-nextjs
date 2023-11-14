"use client";
import {
  AppstoreOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  TagsOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let location = usePathname();

  function getItem(key, label, icon, children) {
    return {
      key,
      icon,
      label,
      children,
    };
  }
  const items = [
    getItem("/news", "News", <ReadOutlined />, [
      getItem(
        "/admin/news",
        <Link href="/admin/news">News List</Link>,
        <MailOutlined />
      ),
      getItem(
        "/admin/news/add",
        <Link href="/admin/news/add">Add News</Link>,
        <MailOutlined />
      ),
      getItem(
        "/admin/news_categories",
        <Link href="/admin/news_categories">News Categories</Link>,
        <MailOutlined />
      ),
    ]),
    getItem("/articles", "Articles", <AppstoreOutlined />, [
      getItem(
        "/admin/articles",
        <Link href="/admin/articles">Articles List</Link>,
        <MailOutlined />
      ),
      getItem(
        "/admin/articles/add",
        <Link href="/admin/articles/add">Add Article</Link>,
        <MailOutlined />
      ),
      getItem(
        "/admin/article_categories",
        <Link href="/admin/article_categories">Article Categories</Link>,
        <MailOutlined />
      ),
    ]),
    getItem("/users", "Users", <UsergroupAddOutlined />, [
      getItem(
        "/admin/users",
        <Link href="/admin/users">Users List</Link>,
        <MailOutlined />
      ),
      getItem(
        "/admin/users/add",
        <Link href="/admin/users/add">Add User</Link>,
        <MailOutlined />
      ),
    ]),
    getItem(
      "/admin/tags",
      <Link href="/admin/tags">Tags</Link>,
      <TagsOutlined />
    ),
    getItem(
      "/admin/languages",
      <Link href="/admin/languages">Languages</Link>,
      <GlobalOutlined />
    ),
  ];

  return location.split("/").includes("login") ? (
    <>{children}</>
  ) : (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={210}>
        <div>
          <Link
            href="/admin"
            target="_blank"
            className="sidebar-logo p-4 flex justify-center items-center gap-2"
          >
            <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo" />
            {!collapsed && (
              <div className="font-semibold">ADMIN&nbsp;DASHBOARD</div>
            )}
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["news"]}
          selectedKeys={[location]}
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
              gap: "6px",
            }}
          >
            <Avatar icon={<UserOutlined />} />
            <Button
              type="dashed"
              icon={<LogoutOutlined />}
              onClick={() => router.push("/admin/login")}
            >
              Logout
            </Button>
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
