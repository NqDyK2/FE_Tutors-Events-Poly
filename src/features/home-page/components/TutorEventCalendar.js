import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Popover } from 'antd';

const TutorEventCalendar = (props) => {
  return (
    <FullCalendar
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
      headerToolbar={{
        left: '',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listDay,today,prev,next',
      }}
      locales={['vi', 'en']}
      locale={['vi']}
      timeZone={'Asia/Ho_Chi_Minh'}
      firstDay={1}
      weekTextLong
      height={600}
      viewClassNames="dark:tw-bg-dark-mode"
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
      allDayText="Cả ngày"
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
      eventContent={(info) => {
        console.log(info);
        return (
          <Popover content={info.event.title} trigger="click" title="Thông tin chi tiết" key={info}>
            <div className="tw-text-sm tw-font-bold tw-text-center tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-h-6 tw-w-full tw-p-1  tw-rounded-md"
              style={{ backgroundColor: info.backgroundColor ? info.backgroundColor : '#000' }}
            >
              {info.event.title}
            </div>
          </Popover>
        );
      }}
      initialView="dayGridMonth"
      dayMaxEvents={4}
      events={props.eventsData}
    />
  );
};

export default TutorEventCalendar;
