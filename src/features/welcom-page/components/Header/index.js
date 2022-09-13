import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";
// import image
import Logo from './../../../../assets/images/Logo.png';

const WelcomHeader = () => {
    return (
        <div className='header tw-flex tw-items-center tw-content-center tw-justify-between'>
            <div className='tw-pl-[15px]'>
                <Link to='#'>
                    <img
                        className='tw-w-[160px]'
                        src={Logo}
                        alt=''
                    />
                </Link>
            </div>
            <div>
                <Link
                    className='tw-text-black tw-pr-[15px] tw-font-medium'
                    to='/auth'
                >
                    ĐĂNG NHẬP
                </Link>
            </div>
        </div>
    );
};
export default WelcomHeader;