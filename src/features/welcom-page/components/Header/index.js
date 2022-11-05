import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
// import image
import Logo from './../../../../assets/images/Logo.png';

const WelcomHeader = () => {
  return (
    <div className='header tw-flex tw-py-3 tw-px-4 tw-content-center tw-items-center tw-justify-between tw-shadow-md'>
      <div>
        <Link to='#'>
          <img className='tw-h-[70px]' src={Logo} alt='' />
        </Link>
      </div>
      <div>
        <Link className='tw-font-medium tw-text-black' to='/auth'>
          ĐĂNG NHẬP
        </Link>
      </div>
    </div>
  );
};
export default WelcomHeader;
