import React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.css';
import TutorEventCalendar from '../components/TutorEventCalendar';

const HomePage = () => {
  const eventsData = [
    {
      title: 'Sự kiện đấm nhau ',
      start: '2022-09-15T12:30:00',
      end: '2022-09-15T15:30:00',
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
      title: 'event 1',
      date: '2022-09-16',
      description: 'Đấm bỏ mẹ thằng Đàm Minh Hiếu',
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
