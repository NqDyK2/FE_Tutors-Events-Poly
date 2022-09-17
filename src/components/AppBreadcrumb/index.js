import { Breadcrumb } from 'antd';
import React from 'react';
import { } from '@ant-design/icons';
import { RiHome6Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { useEffect } from 'react';
const AppBreadcrumb = () => {
  const pathname = useLocation().pathname;
  const [breadcrumb, setBreadcrumb] = React.useState('Trang chủ');
  const breadcrumbData = [
    {
      path: '/',
      breadcrumbName: 'Trang chủ',
    },
    {
      path: '/crclass',
      breadcrumbName: 'Thêm lớp học',
    },
    {
      path: '/attendance',
      breadcrumbName: 'Điểm danh',
    },
    {
      path: '/attendance-student',
      breadcrumbName: 'Điểm danh',
    },
  ];

  function getBreadcrumb() {
    breadcrumbData.map((item) => {
      if (item.path === pathname) {
        setBreadcrumb(item.breadcrumbName);
      }
      return null;
    });
  }

  useEffect(() => {
    getBreadcrumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Breadcrumb
      separator='|'
      className='app-breadcrumb tw-px-4 tw-py-4 tw-flex tw-items-center tw-bg-white  tw-shadow-sm tw-shadow-white tw-drop-shadow-sm'
    >
      <Breadcrumb.Item className='tw-text-black tw-opacity-80 tw-text-base'>
        {breadcrumb ?? 'Trang chủ'}
      </Breadcrumb.Item>

      <Breadcrumb.Item className='tw-h-full tw-flex tw-items-center'>
        <Link to='/' className='tw-text-[#C4CFF0] hover:tw-text-blue-300'>
          <RiHome6Line className='tw-align-text-bottom' size={18} />
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
