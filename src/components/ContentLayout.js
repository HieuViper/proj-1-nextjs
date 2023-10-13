import { Layout, theme } from "antd";
const { Header, Sider, Content } = Layout;

export default function ContentLayout({ children }) {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
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
    );
}