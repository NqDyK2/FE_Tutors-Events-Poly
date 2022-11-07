import { Breadcrumb } from 'antd';
import React from 'react';
import { } from '@ant-design/icons';
import { RiHome6Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';

const AppBreadcrumb = () => {
  const pathname = useLocation().pathname;
  const { flexBreadcrumb } = useSelector(state => state.breadcrumb)
  const [breadcrumb, setBreadcrumb] = React.useState('Trang chủ');
  const currentUser = useSelector(selectCurrentUser);
 // const breadcrumbData = [
  //   {
  //     path: '/',
  //     breadcrumbName: 'Trang chủ',
  //   },
  //   {
  //     path: '/diem-danh',
  //     breadcrumbName: 'Điểm danh',
  //   },
  //   {
  //     path: '/calendar-tutor',
  //     breadcrumbName: 'Lịch tutor',
  //   },
  //   {
  //     path: '/list-class',
  //     breadcrumbName: 'Danh sách lớp học',
  //   },
  //   {
  //     path: `/diem-danh/${pathname.split('/')[2]}`,
  //     breadcrumbName: 'Điểm danh',
  //   },
  //   {
  //     path: `/diem-danh/lop/${pathname.split('/')[3]}`,
  //     breadcrumbName: 'Điểm danh',
  //   },
  //   {
  //     path: `/diem-danh/buoi-hoc/${pathname.split('/')[5]}`,
  //     breadcrumb: 'Điểm danh',
  //   },
  //   {
  //     path: '/import-students',
  //     breadcrumbName: 'Import danh sách sinh viên',
  //   },
  //   {
  //     path: '/manage',
  //     breadcrumbName: `${currentUser.role_id === 1 ? ' Quản lý kỳ học ' : 'Danh sách kỳ học'}`,
  //   },
  //   {
  //     path: `/manage/sem/${pathname.split('/')[3]}`,
  //     breadcrumbName: `${currentUser.role_id === 1 ? 'Quản lý lớp học' : 'Danh sách lớp học'}`,
  //   },
  //   {
  //     path: `/manage/class/lesson/${pathname.split('/')[4]}`,
  //     breadcrumbName: 'Danh sách lịch học',
  //   },
  //   {
  //     path: `/manage/class/${pathname.split('/')[3]}`,
  //     breadcrumbName: 'Danh sách sinh viên',
  //   },
  //   {
  //     path: `/manage/major`,
  //     breadcrumbName: 'Quản lý chuyên ngành / môn học',
  //   },
  // ];
  return (
    // <Breadcrumb
    //   key={pathname}
    //   separator='|'
    //   className='tw-flex tw-items-center tw-bg-white tw-px-4 tw-py-4 tw-shadow-sm  tw-shadow-white tw-drop-shadow-sm dark:tw-bg-[#202125] dark:tw-opacity-90 dark:tw-shadow-none'
    // >
    // <Breadcrumb.Item className='tw-flex tw-h-full tw-items-center'>
    //   <Link
    //     to='/'
    //     className='tw-text-[#C4CFF0] hover:tw-text-blue-300 dark:tw-text-slate-100'
    //   >
    //     <RiHome6Line className='tw-align-text-bottom' size={18} />
    //   </Link>
    // </Breadcrumb.Item>
    //   <Breadcrumb.Item className='tw-flex tw-h-full tw-items-center'>
    //     <Link
    //       to='/'
    //       className='tw-text-[#C4CFF0] hover:tw-text-blue-300 dark:tw-text-slate-100'
    //     >
    //       <RiHome6Line className='tw-align-text-bottom' size={18} />
    //     </Link>
    //   </Breadcrumb.Item>
    //   <Breadcrumb.Item className='tw-text-base tw-text-black tw-opacity-80 dark:tw-text-white dark:tw-opacity-100'>
    //     {breadcrumb ?? 'Trang chủ'}
    //   </Breadcrumb.Item>
    // </Breadcrumb>


    <Breadcrumb
      key={pathname}
      className='tw-flex tw-items-center tw-bg-white tw-px-4 tw-py-4 tw-shadow-sm  tw-shadow-white tw-drop-shadow-sm dark:tw-bg-[#202125] dark:tw-opacity-90 dark:tw-shadow-none'
    >
      {/* <Breadcrumb.Item>
        <Link
          to='/'
          className='tw-text-[#C4CFF0] hover:tw-text-blue-300 dark:tw-text-slate-100'
        >
          <RiHome6Line size={18} />
        </Link>
      </Breadcrumb.Item> */}

      {
        flexBreadcrumb?.length && flexBreadcrumb.map(e => (
          <Breadcrumb.Item
            key={e.path}
          >
            <Link
              to={e.path}
              className='tw-text-[#C4CFF0] hover:tw-text-blue-300 dark:tw-text-slate-100'
            >
              {e.title}
            </Link>
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>

  );
};

export default AppBreadcrumb;
