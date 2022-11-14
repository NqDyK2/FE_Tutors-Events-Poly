import { Button, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
  UpOutlined,
  BellOutlined,
  CarryOutOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { ImBooks } from 'react-icons/im';
import { AiFillSchedule, AiOutlineHistory } from 'react-icons/ai';
import Logo from './../../assets/images/Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector } from 'react-redux';
import {
  selectIsAdmin,
  selectIsStudent,
  selectIsTeacher,
  selectIsTutor,
} from '../../features/auth/authSlice';
import { BsFillCalendar2EventFill } from 'react-icons/bs';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AppAside = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin);
  const isTeacher = useSelector(selectIsTeacher);
  const isTutor = useSelector(selectIsTutor);
  const isStudent = useSelector(selectIsStudent);
  const acceptManager = isAdmin || isTeacher;
  const acceptAttendance = isTeacher || isTutor;
  const studentTutorial = isStudent || isTutor;
  const location = useLocation();

  const onClickHandler = (data) => {
    navigate(data.key);
  };

  // navigate by key value of menu item
  const items = [
    getItem(
      <div className="dark:tw-text-white">Thông báo và tin tức</div>,
      '/',
      <BellOutlined className="tw-text-[18px]  tw-text-[#C4CFF9]" />,
    ),
    // getItem(
    //   <div className="dark:tw-text-white">
    //     Danh sách sự kiện
    //   </div>,
    //   '/events',
    //   <BsFillCalendar2EventFill className="tw-text-[17px]  tw-text-[#C4CFF9] " />
    // ),
    acceptAttendance &&
    getItem(
      <div
        className={`${collapsed
            ? 'tw-text-white'
            : 'tw-text-[#313752] dark:!tw-text-white'
          }`}
      >
        Lịch dạy
      </div>,
      '/lich-day',
      <SolutionOutlined className="tw-text-[18px]  tw-text-[#C4CFF9]" />,
    ),
    acceptAttendance &&
    getItem(
      <div
        className='dark:tw-text-white'
      >
        Điểm danh
      </div>,
      '/diem-danh',
      <CarryOutOutlined className="tw-text-[18px]  tw-text-[#C4CFF9]" />,
    ),
    studentTutorial &&
    getItem(
      <div
        className={`${collapsed
            ? 'tw-text-white'
            : 'tw-text-[#313752] dark:!tw-text-white'
          }`}
      >
        Lịch học
      </div>,
      '/lich-hoc',
      <AiFillSchedule className="tw-text-[18px]  tw-text-[#C4CFF9] " />,
      // [
      //   acceptManager && getItem(
      //     <div className='tw-text-[#313752]  dark:!tw-text-white '>Lịch học</div>,
      //     '/manage',
      //     !collapsed && (
      //       <BsDot className='  tw-text-[#C4CFF9] tw-text-[18px]' />
      //     )
      //   ),
      //   isAdmin && getItem(
      //     <div className='tw-text-[#313752] dark:!tw-text-white '>Môn học</div>,
      //     '/manage/major',
      //     !collapsed && (
      //       <BsDot className='   tw-text-[#C4CFF9] tw-text-[18px]' />
      //     )
      //   ),
      // isAdmin && getItem(
      //   <div className='tw-text-[#313752] dark:!tw-text-white '> Giảng viên</div>,
      //   '/manage/teacher',
      //   !collapsed && (
      //     <BsDot className='   tw-text-[#C4CFF9] tw-text-[18px]' />
      //   )
      // )
      // ]
    ),

    // studentTutorial &&
    //   getItem(
    //     <div
    //       className={`${
    //         collapsed
    //           ? 'tw-text-white'
    //           : 'tw-text-[#313752] dark:!tw-text-white'
    //       }`}
    //     >
    //       Lịch sử học
    //     </div>,
    //     '/lich-su-hoc',
    //     <AiOutlineHistory className="tw-text-[18px]  tw-text-[#C4CFF9] " />,
    //   ),

    isAdmin &&
    getItem(
      <div
        className={`${collapsed
            ? 'tw-text-white'
            : 'tw-text-[#313752] dark:!tw-text-white'
          }`}
      >
        Quản lý lịch học
      </div>,
      '/manage',
      <AiFillSchedule className="tw-text-[18px]  tw-text-[#C4CFF9] " />,
    ),
    acceptAttendance &&
    getItem(
      <div
        className={`${collapsed
            ? 'tw-text-white'
            : 'tw-text-[#313752] dark:!tw-text-white'
          }`}
      >
        Kiểm tra lớp học
      </div>,
      '/manage',
      <AiFillSchedule className="tw-text-[18px]  tw-text-[#C4CFF9] " />,
    ),
    isAdmin &&
    getItem(
      <div
        className={`${collapsed
            ? 'tw-text-white'
            : 'tw-text-[#313752] dark:!tw-text-white'
          }`}
      >
        Quản lý môn học
      </div>,
      '/manage/major',
      <ImBooks className="tw-text-[18px]  tw-text-[#C4CFF9] " />,
    ),
    // acceptManager && getItem(
    //     <div className={`${
    //       collapsed
    //         ? 'tw-text-white'
    //         : 'tw-text-[#313752] dark:!tw-text-white'
    //     }`}>
    //         Quản lý sự kiện.
    //     </div>,
    //       '/manage/events',
    //     <BsFillCalendar2EventFill className="tw-text-[17px]  tw-text-[#C4CFF9] " />
    // )
    // isAdmin &&
    //   getItem(
    //     <div className="tw-text-[#313752] dark:!tw-text-white ">
    //       Quản lý giảng viên
    //     </div>,
    //     '/manage/teacher',
    //     !collapsed && (
    //       <FaChalkboardTeacher className="   tw-text-[18px] tw-text-[#C4CFF9]" />
    //     ),
    //   ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Sự kiện
    //   </div>,
    //   '/events',
    //   <BiCalendarStar className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),

    // getItem(
    //   <div
    //     className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
    //       }`}
    //   >
    //     Hỗ trợ
    //   </div>,
    //   '',
    //   <IoMdHelpCircle className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
  ];

  const [collapsedWidth, setCollapsedWidth] = useState(0);

  return (
    <Sider
      trigger={null}
      collapsible
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
        setCollapsedWidth(broken ? 0 : 62.5);
      }}
      width={256}
      collapsedWidth={collapsedWidth}
      collapsed={collapsed}
      className=" tw-fixed tw-left-0 tw-top-0 tw-bottom-0 tw-z-50 tw-min-h-full tw-overflow-auto tw-bg-white tw-shadow-xl tw-drop-shadow-xl dark:tw-bg-[#202125] dark:tw-shadow-md dark:tw-shadow-gray-900 dark:tw-drop-shadow-2xl md:tw-sticky"
    >
      <div className="tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-px-2">
        {!collapsed && (
          <div className="logo tw-ml-4 tw-mb-5 tw-mt-2 tw-flex-1">
            <Link to="/">
              <img src={Logo} alt="logo" width={'80%'} />
            </Link>
          </div>
        )}
        <Button
          className="hover:text-blue-500  tw-my-2 tw-border-none tw-bg-transparent tw-text-blue-400 hover:tw-bg-transparent"
          shape="none"
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          icon={
            collapsed ? (
              <DoubleRightOutlined className="tw-text-xl" />
            ) : (
              <DoubleLeftOutlined className="tw-text-xl" />
            )
          }
        ></Button>
      </div>
      <Menu
        // theme='dark'
        className="app-sidebar dark:tw-bg-[#202125] "
        onClick={(e) => onClickHandler(e)}
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[location.pathname]}
        items={items}
        expandIcon={({ isOpen }) =>
          isOpen ? (
            <UpOutlined className="!tw-text[#313752] tw-text-[11px]" />
          ) : (
            <RightOutlined className="!tw-text[#313752] tw-text-[11px]" />
          )
        }
      />
    </Sider>
  );
};

export default AppAside;
