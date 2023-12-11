"use client";
import { useLogin } from "@/store/login";
import {
  AppstoreOutlined,
  FileImageOutlined,
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
import { Avatar, Button, Layout, Menu, Modal, theme } from "antd";
import Image from "next/image";


import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LoginSmallForm from "./LoginSmallForm";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

const DashboardLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { loginForm, setLoginForm } = useLogin();

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

  const role = props.roles[props.user?.role]; //get role of user
  const items = [];
  if (role?.news) {
    let subItems = [];
    subItems.push(
      getItem(
        "/admin/news",
        <Link href="/admin/news">News List</Link>,
        <MailOutlined />
      )
    );
    if (role?.news?.add == true)
      subItems.push(
        getItem(
          "/admin/news/add",
          <Link href="/admin/news/add">Add News</Link>,
          <MailOutlined />
        )
      );
    if (role?.news_categories)
      subItems.push(
        getItem(
          "/admin/news_categories",
          <Link href="/admin/news_categories">News Categories</Link>,
          <MailOutlined />
        )
      );
    items.push(getItem("/news", "News", <ReadOutlined />, subItems));
  }
  if (role?.articles) {
    let subItems = [];
    subItems.push(
      getItem(
        "/admin/articles",
        <Link href="/admin/articles">Articles List</Link>,
        <MailOutlined />
      )
    );
    if (role?.articles?.add == true)
      subItems.push(
        getItem(
          "/admin/articles/add",
          <Link href="/admin/articles/add">Add Article</Link>,
          <MailOutlined />
        )
      );
    if (role?.article_categories)
      subItems.push(
        getItem(
          "/admin/article_categories",
          <Link href="/admin/article_categories">Article Categories</Link>,
          <MailOutlined />
        )
      );
    items.push(
      getItem("/articles", "Articles", <AppstoreOutlined />, subItems)
    );
  }
  if (role?.users) {
    let subItems = [];
    subItems.push(
      getItem(
        "/admin/users",
        <Link href="/admin/users">Users List</Link>,
        <MailOutlined />
      )
    );
    if (role?.users?.add == true)
      subItems.push(
        getItem(
          "/admin/users/add",
          <Link href="/admin/users/add">Add User</Link>,
          <MailOutlined />
        )
      );
    items.push(getItem("/users", "Users", <UsergroupAddOutlined />, subItems));
  }
  if (role?.tags) {
    items.push(
      getItem(
        "/admin/tags",
        <Link href="/admin/tags">Tags</Link>,
        <TagsOutlined />
      )
    );
  }
  if (role?.languages) {
    items.push(
      getItem(
        "/admin/languages",
        <Link href="/admin/languages">Languages</Link>,
        <GlobalOutlined />
      )
    );
  }
  if (role?.images) {
    items.push(
      getItem(
        "/admin/images",
        <Link href="/admin/images">Images</Link>,
        <FileImageOutlined />
      )
    );
  }

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={210}>
        <div>
          <Link
            href="/admin"
            target="_blank"
            className="sidebar-logo p-4 flex justify-center items-center gap-2"
          >
            <Image src="https://ng.ant.design/assets/img/logo.svg" alt="logo" width={200} height={200} />
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
            {props.user?.image ? (
              <Image
                src={props.user.image}
                width={30}
                height={30}
                style={{ width: "30px", height: "30px" }}
                className="mr-2"
                alt={props.user.display}
              />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
            <Button
              type="dashed"
              icon={<LogoutOutlined />}
              onClick={() => props.logout()}
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
          {props.children}
        </Content>
      </Layout>

      <Modal
        title="Login"
        open={loginForm}
        onCancel={() => {
          router.push("/login");
        }}
        footer={[]}
      >
        <LoginSmallForm {...{ setLoginForm }} />
      </Modal>
    </Layout>
  );
};

export default DashboardLayout;
