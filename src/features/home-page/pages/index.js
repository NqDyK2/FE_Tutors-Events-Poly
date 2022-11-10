import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.css';
import TutorEventCalendar from '../components/TutorEventCalendar';
// import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFlexBreadcrumb([{ title: 'Trang chủ', path: `/` }]));
  }, [dispatch])

  const eventsData = [
    {
      title: 'Sự kiện đấm nhau ',
      start: '2022-09-15T12:30:00',
      end: '2022-09-20T14:30:30+07:00',
      color: '#000',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
    },
    {
      title: 'Sự kiện 1',
      start: '2022-09-15T12:30:00',
      end: '2022-09-15T13:30:00',
      color: '#ff0000',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
    },
    {
      title: 'event 1',
      date: '2022-09-12',
      color: '#fff988',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
    },
    {
      title: 'event 1',
      date: '2022-09-18',
      color: '#fff988',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
    },
    {
      title: 'event 1',
      date: '2022-09-14',
      color: '#fff988',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
    },
    {
      title:"𝗕𝗔𝗖𝗞-𝗘𝗡𝗗 𝗛𝗔𝗬 𝗙𝗥𝗢𝗡𝗧-𝗘𝗡𝗗 HƯỚNG ĐI NÀO CHO EM",
      start: "2022-10-13T19:00:00",
      end: "2022-10-13T21:00:00",
      description:'Những công việc mà dân Back-end và Front-end đảm nhận?',
    },
    {
      title:"ĐỊNH HƯỚNG CHUYÊN NGÀNH PHÁT TRIỂN PHẦN MỀM",
      start: "2022-10-15T18:30:00",
      end: "2022-10-15T20:30:00",
      description:'Ngành Phát Triển Phần Mềm (PTPM) là chuyên ngành được đào tại tại trường FPT POLYTECHNIC với mục tiêu đào tạo CNTT chuyên về lĩnh vực PTPM.',
    },
    {
      title:"CÁN ĐÍCH THÀNH CÔNG '' DỰ ÁN TỐT NGHIỆP'' ",
      start: "2022-10-15T19:00:00",
      end: "2022-10-15T21:00:00",
      description:"Cùng đồng hành với các bạn là sự trở lại của 2 Thầy giáo tâm huyết, tài năng và \"dày dặn\" kinh nghiệm đưa sinh viên vượt qua DATN một cách dễ dàng vả vẻ vang."
    },
    {
      title:'THĂM QUAN & TUYỂN DỤNG TẠI FPT SOFTWARE',
      start:'2022-11-14T12:30:00',
      end:'2022-11-14T17:30:00',
      color: "#000",
      description:'Tham quan F-Ville, FPT SoftWare với cơ hội việc làm tại FPT SoftWare',
    },
    {
      title:"BAY CAO NÀO, NHẢY CAO NÀO",
      start:"2022-11-05",
      end:"2022-11-19",
      color:"pink",
      description:"Cuộc thi nhảy Flashmob trên nền \"Nhạc chế \" về thầy cô nhằm chào mừng ngày 20/11. "
    },
  ];

  return (
    <>
      <Helmet>
        <title>Trang chủ | FPOLY</title>
      </Helmet>

      <div>
        <TutorEventCalendar eventsData={eventsData} />
      </div>
    </>
  );
};

export default HomePage;
