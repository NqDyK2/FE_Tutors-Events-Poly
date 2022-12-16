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
