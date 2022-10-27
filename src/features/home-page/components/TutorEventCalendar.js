import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

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
      eventClick={(info) => {
        info.jsEvent.preventDefault();
        tippy(info.el, {
          content: /*html*/ `
            <div
              class="tw-min-w-[200px] tw-max-w-[300px] tw-max-h-[300px] "
            >
              <div class="tw-text-lg tw-font-bold tw-mb-2 tw-text-center">Thông tin chi tiết</div>
              <div class="tw-flex  tw-justify-between tw-items-center tw-mb-2">
                <div class="tw-text-sm tw-font-bold">Tên sự kiện:</div>
                <div class="tw-text-sm">${info.event.title}</div>

              </div>
            </div>
          
          `,
          allowHTML: true,
          placement: 'top-start',
          // theme: 'light',
          trigger: 'focus',
          appendTo: () => document.body,
          interactive: true,
          arrow: true,
          animation: 'shift-away',
          duration: [100, 100],
        });
      }}

      initialView="dayGridMonth"
      dayMaxEvents={4}
      events={props.eventsData}
    />
  );
};

export default TutorEventCalendar;
