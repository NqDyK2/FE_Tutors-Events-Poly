import { Header } from 'antd/lib/layout/layout';
import React from 'react';

const AppHeader = () => {
  return (
    <Header className='tw-bg-white tw-border-b' style={{ padding: 0 }}>
      <div className='tw-flex tw-items-center tw-content-center'>
        This is the header
      </div>
    </Header>
  );
};

export default AppHeader;
