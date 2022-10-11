import { Button, Dropdown } from 'antd';
import React from 'react';
import { BiUserPin } from 'react-icons/bi';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    toast.info('Đăng xuất thành công');
  };
  return (
    <Button
      type='text'
      className='tw-bg-blue-100 tw-text-[13px] tw-font-medium tw-text-blue-600 hover:tw-bg-blue-600 hover:tw-text-white'
      onClick={handleLogOut}
    >
      Đăng xuất
    </Button>
  );
};

const DropdownOverlay = ({ currentUser }) => {
  return (
    <>
      <div className='tw-max-w-md tw-rounded-sm tw-bg-white tw-shadow-md md:tw-w-[150px] lg:tw-w-[400px]'>
        <div className='tw-flex tw-h-[75px] tw-items-center tw-rounded-t-sm tw-bg-[#2E47AE]'>
          <h4 className='tw-ml-6  tw-text-base tw-text-gray-200'>
            {currentUser?.name}
          </h4>
        </div>
        <Link
          to='/profile'
          className=' tw-flex tw-w-full tw-items-center tw-p-4 tw-text-base tw-text-gray-600'
        >
          <div>
            <BiUserPin className='tw-mr-4 tw-h-6 tw-w-6 tw-text-emerald-600' />
          </div>
          <div className='tw-flex-1 '>
            <p className='tw-mb-0 tw-text-[13px] hover:tw-text-blue-500 '>
              Hồ sơ cá nhân
            </p>
            <p className='tw-mb-0 tw-text-[13px] tw-text-gray-400 '>
              Thông tin cá nhân
            </p>
          </div>
          <div>
            <AiOutlineCaretRight className='tw-ml-auto tw-h-3 tw-w-3 tw-text-blue-300' />
          </div>
        </Link>
        <div className='tw-mx-4 tw-border-t tw-border-gray-100 tw-py-4'>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

const UserDropDown = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={<DropdownOverlay currentUser={currentUser} />}
        placement='topLeft'
      >
        <Button
          type='text'
          className='tw-px-2 tw-text-[12px] tw-text-neutral-600 hover:tw-bg-blue-100 dark:tw-text-slate-200 dark:hover:tw-text-white dark:hover:tw-bg-[#1b1c1f] '
        >
          <span className='tw-text-blue-300'>Xin chào</span>,{' '}
          {currentUser?.name.split(' ')[0]}
        </Button>
      </Dropdown>
    </>
  );
};

export default UserDropDown;
