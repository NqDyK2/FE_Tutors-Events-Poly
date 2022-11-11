import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import ThemeToogle from './components/ThemeToogle';
import UserDropDown from './components/UserDropDown';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

const AppHeader = ({ collapsed, setCollapsed }) => {
  return (
    <Header
      className="tw-flex tw-items-center tw-justify-between tw-gap-x-2 tw-border-b tw-bg-white tw-pr-4 dark:tw-border-b-slate-500 dark:tw-bg-[#202125]"
      style={{ padding: 0 }}
    >
      <div className="tw-ml-4 sm:tw-invisible">
        {collapsed ? (
          <RiMenuUnfoldFill
            className="tw-text-[20px] tw-text-blue-400"
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <RiMenuFoldFill
            className="tw-text-[20px] tw-text-blue-400"
            onClick={() => setCollapsed(!collapsed)}
          />
        )}
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <ThemeToogle />
        <UserDropDown />
      </div>
    </Header>
  );
};

export default AppHeader;
