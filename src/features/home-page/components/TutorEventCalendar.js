import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const TutorEventCalendar = (props) => {
  
  return (
    <FullCalendar
      schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
      plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listDay',
      }}
      locales={['vi', 'en']}
      locale={['vi']}
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
      //  validRange={{
      //     start: Date.now()
      //  }}
      eventClick={(info) => {
        info.jsEvent.preventDefault();
       
      }}
      eventMouseEnter={(info) => {
        tippy(info.el, {
          content: info.event.extendedProps.description,
          allowHTML: true,
          placement: 'top',
          theme: 'dark',
          trigger: 'mouseenter',
          interactive: true,
          arrow: true,
          animation: 'shift-away',
          duration: [100, 100],
        });
      }}
      initialView='dayGridMonth'
      dayMaxEvents={4}
      events={props.eventsData}
    />
  );
};

export default TutorEventCalendar;
