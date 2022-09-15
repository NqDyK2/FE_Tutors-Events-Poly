import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
const TutorEventCalendar = (props) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
      locale={'vi'}
      timeZone={'Asia/Ho_Chi_Minh'}
      firstDay={1}
      weekTextLong
      height={600}
      handleWindowResize={true}
      windowResizeDelay={100}
      buttonText={{
        today: 'Hôm nay',
        month: 'Tháng',
        week: 'Tuần',
        day: 'Ngày',
      }}
      noEventsText={'Không có sự kiện'}
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
    //  validRange={{
    //     start: Date.now()
    //  }}
      initialView='dayGridMonth'
      events={props.eventsData}
    />
  );
};

export default TutorEventCalendar;
