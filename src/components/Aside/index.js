import { Button, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link to='/'>Test</Link>,
    '1',
    <Link to='/'>
      <PieChartOutlined />
    </Link>
  ),
  getItem(<Link to='/auth'>Test Link</Link>, '2', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const AppAside = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      trigger={null}
      collapsible
      breakpoint='lg'
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      width={250}
      collapsedWidth={62.5}
      collapsed={collapsed}
      className='tw-overflow-auto tw-h-screen tw-sticky tw-left-0 tw-top-0 tw-bottom-0'
    >
      <div className='tw-flex tw-items-center tw-gap-x-2 tw-justify-center tw-px-2'>
        {!collapsed && (
          <div className='logo tw-h-8 tw-ml-4 tw-bg-slate-300 tw-flex-1'>
            Logo
          </div>
        )}
        <Button
          className='tw-my-2 tw-h-8 tw-bg-transparent tw-border-none tw-text-white'
          shape='none'
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  );
};

export default AppAside;
