import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const AppHeader = ({ collapsed, setCollapsed }) => {
  return (
    <Header className='tw-bg-white' style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'tw-p-5 hover:tw-text-red-900',
        onClick: () => {
          setCollapsed(!collapsed);
        },
      })}
    </Header>
  );
};

export default AppHeader;
