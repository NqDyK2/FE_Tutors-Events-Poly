import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Popover } from 'antd';
import moment from 'moment';

const TutorEventCalendar = (props) => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    setEvents(props.eventsData);
  }, [props.eventsData]);

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
      eventContent={(info) => {
        return (
          <Popover content={() => {
            return (
              <div className='!tw-min-w-[250px]'>
                <div className="tw-flex tw-flex-col tw-gap-y-2">
                  <div className="tw-flex tw-flex-col tw-gap-x-2">
                    <div>
                      <img src={`${process.env.REACT_APP_API_URL}/${info.event.extendedProps.image}`} alt="avatar" className="tw-w-full tw-h-[100px]  tw-object-cover" />
                    </div>
                    <div className="tw-text-sm tw-font-bold">Tiêu đề:</div>
                    <div className="tw-text-sm">{info.event.title}</div>

                    <div className="tw-text-sm tw-font-bold">Ngày bắt đầu:</div>
                    <div className="tw-text-sm">{
                      moment(info.event.start).format('DD/MM/YYYY HH:mm')
                    }</div>

                    <div className="tw-text-sm tw-font-bold">Ngày kết thúc:</div>
                    <div className="tw-text-sm">{moment(info.event.end).format('DD/MM/YYYY HH:mm')
                    }</div>

                    <div className="tw-text-sm tw-font-bold">Địa điểm:</div>
                    <div className="tw-text-sm">{info.event.extendedProps.location}</div>

                  </div>
                </div>
              </div>
            )
          }} trigger="click" title="Thông tin chi tiết" key={info}>
            <div className="tw-text-sm tw-font-bold tw-text-center tw-text-white tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-h-6 tw-w-full tw-p-1  tw-rounded-md"
              style={{ backgroundColor: info.backgroundColor ? info.backgroundColor : '#000' }}
            >
              {info.event.title}
            </div>
          </Popover>
        );
      }}
      initialView="dayGridMonth"
      dayMaxEvents={4}
      events={events ? events : []}
    />
  );
};

export default TutorEventCalendar;
