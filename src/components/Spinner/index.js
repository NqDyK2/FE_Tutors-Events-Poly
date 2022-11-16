import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined
    spin
    className='tw-text-hoverLink dark:tw-text-white'
    style={{ fontSize: 50 }}
  />
);
const Spinner = ({ loading, className, ...props }) => {
  return (
    <Spin
      className={` ${className}`}
      spinning={loading}
      indicator={antIcon}
      {...props}
    />
  );
};

export default Spinner;
