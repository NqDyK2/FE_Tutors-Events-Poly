import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trang chủ | FPOLY</title>
      </Helmet>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
          locale={'vi'}
          firstDay={1}
          weekTextLong
          buttonText={{
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
          }}
          allDaySlot={false}
          allDayText='Cả ngày'
          dayHeaderFormat={{
            weekday: 'long',
          }}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
          }}
          nowIndicator={true}
          headerToolbar={{
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listDay',
          }}
          initialView='dayGridMonth'
          events={[
            {
              title: 'Sự kiện đấm nhau ',
              start: '2022-09-15T12:30:00-05:00',
              end: '2022-09-16T12:30:00-05:00',
              color: '#000',
            },
            { title: 'Sự kiện 1', date: '2022-09-15T12:30:00-05:00',  color: '#ff0000' },
            { title: 'event 1', date: '2022-09-12', color: '#fff988' },
            // { title: 'event 1', date: '2022-09-15', color: '#fff988' },
            // { title: 'event 1', date: '2022-09-15', color: '#fff988' },
            { title: 'event 1', date: '2022-09-16' },
          ]}
        />
      </div>
    </>
  );
};

export default HomePage;
