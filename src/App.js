import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css';
import './App.css';
import { Footer } from 'antd/lib/layout/layout';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout className='tw-min-h-screen' hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className='tw-overflow-auto tw-h-screen tw-sticky tw-left-0 tw-top-0 tw-bottom-0'
        >
          <div className='logo tw-h-6 tw-m-4 tw-bg-slate-300'></div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout className='site-layout'>
          <Header className='tw-bg-white' style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'tw-p-5 hover:tw-text-red-900',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            style={{
              margin: '0 16px',
              overflow: 'initial',
            }}
          >
            <Breadcrumb className='tw-mx-0 tw-my-4'>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className='tw-bg-white tw-p-6 tw-min-h-full'>
              Bill is a cat.
            </div>
          </Content>
          <Footer className='tw-text-center'>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
