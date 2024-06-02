import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import Table from './component';
import "./App.css"
import "./responsive.css"
import { Link, Route, Routes } from 'react-router-dom';
import ComingSoon from './component/ComingSoon';
const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            stickyScrollBarBg: '#6F80A0',
            stickyScrollBarBorderRadius: 100
          },
        },
        token: {
          colorPrimary: "#2A3958",
          fontFamily: "Pretendard",
          stickyScrollBarBorderRadius: 100
        },
      }}
    >
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg" 
          collapsedWidth="0" 
          onBreakpoint={(broken) => {
            if (broken) {
              setCollapsed(true);
            } else {
              setCollapsed(false);
            }
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
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
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
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