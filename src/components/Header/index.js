import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import ThemeToogle from './components/ThemeToogle';
import UserDropDown from './components/UserDropDown';

const AppHeader = () => {
  return (
    <Header
      className='tw-bg-white dark:tw-bg-[#1E2139] tw-border-b dark:tw-border-b-slate-500 tw-pr-4 tw-gap-x-2 tw-flex tw-items-center tw-justify-end'
      style={{ padding: 0 }}
    >
      <ThemeToogle />
      <UserDropDown />
    </Header>
  );
};

export default AppHeader;
