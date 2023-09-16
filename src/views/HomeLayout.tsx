import React, { useState } from 'react';
import { LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import http from '@/utils/http';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem('首页', '/index', <PieChartOutlined />)];

const Home = ({ userInfo }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const onClick = (e: any) => {
    console.log(e.key);
    navigate(e.key);
  };

  const loginOut = () => {
    http.get('/sso/logout').then(() => {});
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='demo-logo-vertical'>xxx统一门户</div>
        <Menu
          theme='dark'
          defaultSelectedKeys={['/index']}
          mode='inline'
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Avatar style={{ verticalAlign: 'middle' }} size='large' gap={1}>
            {userInfo.username}
          </Avatar>
          <Button
            type='primary'
            icon={<LogoutOutlined />}
            onClick={() => loginOut()}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              //   background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: { userInfo: any }) => {
  const { userInfo } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(Home);
