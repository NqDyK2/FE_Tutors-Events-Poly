import { Breadcrumb } from 'antd';
import React from 'react';

const AppBreadcrumb = () => {
  return (
    <Breadcrumb className='tw-mx-0 tw-my-4'>
      <Breadcrumb.Item>Hello</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
