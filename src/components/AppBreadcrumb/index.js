import { Breadcrumb } from 'antd';
import React from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { useSelector } from 'react-redux';

const AppBreadcrumb = () => {
  const pathname = useLocation().pathname;
  const { flexBreadcrumb } = useSelector((state) => state.breadcrumb);
  return (
    <Breadcrumb
      key={pathname}
      separator=""
      className="tw-flex tw-items-center tw-bg-white tw-px-4 tw-py-4 tw-shadow-sm tw-shadow-white tw-drop-shadow-sm dark:tw-bg-[#202125] dark:tw-text-white dark:tw-opacity-90 dark:tw-shadow-none"
    >
      {flexBreadcrumb?.length &&
        flexBreadcrumb.map((e, index) => (
          <React.Fragment key={e.title}>
            <Breadcrumb.Item className="dark:tw-text-white" key={e.title}>
              {e.path ? (
                <Link
                  to={e.path}
                  className="tw-text-gray-500 hover:tw-bg-transparent hover:tw-text-blue-400 dark:tw-text-slate-100 "
                >
                  {e.title === 'Home' ? <RiHomeLine size={18} /> : e.title}
                </Link>
              ) : (
                <span className="tw-text-gray-700 dark:tw-text-white">
                  {e.title}
                </span>
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Separator>
              <span
                className={`dark:tw-text-white ${
                  index === flexBreadcrumb.length - 1
                    ? 'tw-opacity-0'
                    : 'tw-opacity-1'
                }`}
              >
                /
              </span>
            </Breadcrumb.Separator>
          </React.Fragment>
        ))}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
