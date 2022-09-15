import { Button, Dropdown } from 'antd';
import React from 'react';
import { BiUserPin } from 'react-icons/bi';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Button
      type='text'
      className='tw-text-[13px] tw-text-blue-600 tw-font-medium hover:tw-bg-blue-600 hover:tw-text-white tw-bg-blue-100'
      onClick={handleLogOut}
    >
      Đăng xuất
    </Button>
  );
};

const DropdownOverlay = () => {
  return (
    <>
      <div className='lg:tw-w-[400px] md:tw-w-[150px] tw-max-w-md tw-bg-white tw-shadow-md tw-rounded-sm'>
        <div className='tw-bg-[#2E47AE] tw-h-[75px] tw-flex tw-items-center tw-rounded-t-sm'>
          <h4 className='tw-ml-6  tw-text-gray-200 tw-text-base'>User</h4>
        </div>
        <Link
          to='/profile'
          className=' tw-text-gray-600 tw-text-base tw-flex tw-items-center tw-p-4 tw-w-full'
        >
          <div>
            <BiUserPin className='tw-w-6 tw-h-6 tw-mr-4 tw-text-emerald-600' />
          </div>
          <div className='tw-flex-1 '>
            <p className='tw-text-[13px] hover:tw-text-blue-500 tw-mb-0 '>
              Hồ sơ cá nhân
            </p>
            <p className='tw-text-[13px] tw-text-gray-400 tw-mb-0 '>
              Thông tin cá nhân
            </p>
          </div>
          <div>
            <AiOutlineCaretRight className='tw-w-3 tw-h-3 tw-text-blue-300 tw-ml-auto' />
          </div>
        </Link>
        <div className='tw-border-t tw-border-gray-100 tw-mx-4 tw-py-4'>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

const UserDropDown = () => {
  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={DropdownOverlay}
        placement='topLeft'
      >
        <Button
          type='text'
          className='tw-text-[12px] tw-text-neutral-600 tw-px-2 hover:tw-bg-blue-100 '
        >
          <span className='tw-text-blue-300'>Xin chào</span>, User
        </Button>
      </Dropdown>
    </>
  );
};

export default UserDropDown;
