import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import ThemeToogle from './components/ThemeToogle';
import UserDropDown from './components/UserDropDown';

const AppHeader = () => {
  return (
    <Header
      className='tw-flex tw-items-center tw-justify-end tw-gap-x-2 tw-border-b tw-bg-white tw-pr-4 dark:tw-border-b-slate-500 dark:tw-bg-[#202125]'
      style={{ padding: 0 }}
    >
      <ThemeToogle />
      <UserDropDown />
    </Header>
  );
};

export default AppHeader;
