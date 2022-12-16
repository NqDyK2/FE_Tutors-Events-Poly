import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.css';
import TutorEventCalendar from '../components/TutorEventCalendar';
// import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import { useGetAllEventQuery } from '../../../app/api/eventApiSlice';
import moment from 'moment';

const HomePage = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error, isSuccess } = useGetAllEventQuery();
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    dispatch(setFlexBreadcrumb([{ title: 'Trang chủ', path: `/` }]));
  }, [dispatch])

  useEffect(() => {
    if (isSuccess) {
      // dont't take event that is expired 
      const eventsData = data?.data?.filter(event => moment(event.start_time).isAfter(moment())).map((event, index) => {
        {
          return {
            id: event.id,
            title: event.name,
            start: moment(event.start_time).toDate(),
            image: event.image,
            end: moment(event.end_time).toDate(),
            allDay: false,
            resource: event.location,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            description: event.description,
            location: event.location,
          }
        }
      })


      setEventsData(eventsData)
    }
  }, [data])

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
