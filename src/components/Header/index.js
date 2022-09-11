import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';

// images
import Logo from './../../assets/images/Logo.png';

const AppHeader = () => {
  return (
    <Header className='tw-bg-white' style={{ padding: 0 }}>
      <div className='tw-flex tw-items-center tw-content-center tw-justify-between'>
        <div>
          <img
            className='tw-w-[160px]'
            src={Logo}
            alt=''
          />
        </div>
        <div>
          <Link
            className='tw-text-black tw-pr-[15px]'
            to='/login'
          >
            ĐĂNG NHẬP
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
