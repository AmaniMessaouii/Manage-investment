import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import Table from './component';
import ComingSoon from './component/ComingSoon';
import "./App.css";
import "./responsive.css";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">대시보드</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/soon">회원 관리</Link>,
    },
    {
      key: '3',
      icon: <AreaChartOutlined />,
      label: <Link to="/soon">영업 관리</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            stickyScrollBarBg: '#6F80A0',
            stickyScrollBarBorderRadius: 100,
          },
        },
        token: {
          colorPrimary: "#2A3958",
          fontFamily: "Pretendard",
          stickyScrollBarBorderRadius: 100,
        },
      }}
    >
      <Layout>
        {isMobile ? (
          <Drawer
            onClose={onClose}
            open={drawerVisible}
            placement="left"
            bodyStyle={{ padding: 0 }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
          </Drawer>
        ) : (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              setCollapsed(broken);
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
          </Sider>
        )}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {isMobile ? (
              <Button
                onClick={showDrawer}
                icon={<MenuUnfoldOutlined />}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            ) : (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            )}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/soon" element={<ComingSoon />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
