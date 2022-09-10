import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
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
  getItem(<Link to='/' >Test</Link>, '1', <Link to='/' ><PieChartOutlined /></Link>),
  getItem(<Link to='/auth' >Test Link</Link>, '2', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const AppAside = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      breakpoint='lg'
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      width={235}
      collapsedWidth={62.5}
      collapsed={collapsed}
      className='tw-overflow-auto tw-h-screen tw-sticky tw-left-0 tw-top-0 tw-bottom-0'
    >
      <div className='logo tw-h-6 tw-m-4 tw-bg-slate-300'></div>
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
