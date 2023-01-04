import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import ThemeToogle from './components/ThemeToogle';
import UserDropDown from './components/UserDropDown';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { BellOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import { useGetAuthSettingQuery, useUpdateAuthSettingMutation } from '../../app/api/authApiSlice';
const AppHeader = ({ collapsed, setCollapsed }) => {
  const { data } = useGetAuthSettingQuery();
  const [updateAuthSetting] = useUpdateAuthSettingMutation();

  const checked = data?.data?.next_lession_remind;
  const titleTooltioBall = <div>
    <div>Thông báo lịch học</div>
    <div className='tw-text-center'><Switch defaultChecked={checked === 0 ? false : true} onChange={(value) => {
      updateAuthSetting({
        next_lession_remind: value
      });
    }} /></div>
  </div>

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
        <Tooltip placement="bottom" title={titleTooltioBall}>
          <BellOutlined size={30} className="tw-pr-2" />
        </Tooltip>

        <ThemeToogle />
        <UserDropDown />
      </div>
    </Header>
  );
};

export default AppHeader;
