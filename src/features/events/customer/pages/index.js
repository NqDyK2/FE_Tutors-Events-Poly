/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

// import image
import { useGetAllEventQuery } from '../../../../app/api/eventApiSlice';
import DetailEventModal from '../components/DetailEventModal';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setFlexBreadcrumb } from '../../../../components/AppBreadcrumb/breadcrumbSlice';
import Spinner from '../../../../components/Spinner';

const EventsPage = () => {
  const { data, isLoading, error, isSuccess } = useGetAllEventQuery();
  const dispatch = useDispatch();

  const compareDate = (startTime, endTime) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm');
    if (currentTime.localeCompare(startTime) == -1) {
      return "Tương lai"
    } else if (currentTime.localeCompare(endTime) == 1) {
      return "Đã qua"
    }
    return "Đang diễn ra"
  }

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        {
          title: 'Sự kiện',
        },
      ]),
    );
  });

  return (
    <>
      {isSuccess && (
        <div>
          <div className='tw-grid-cols-1 md:tw-gap-6 tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4' >
            {
              data?.data?.map((item, index) => (
                <div key={index} className='tw-text-center tw-w-full truncate tw-flex tw-flex-col'>
                  <div className='tw-w-full  tw-max-h-[150px] tw-mb-2 '>

                    <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} className=' tw-h-full tw-w-full tw-object-cover' />
                  </div>
                  <div className='tw-flex-1 '>
                    <span className='tw-text-xl dark:tw-text-white'> {item.name} </span> <br />
                  </div>
                  <span className=''>
                    {
                      compareDate(item.start_time, item.end_time)
                    }
                  </span>
                  <DetailEventModal content={item} /> <br />
                  {/* <Button className=' tw-mt-5 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-mr-2 tw-mb-2 tw-w-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-cyan-500 tw-border-transparent tw-to-blue-500 tw-text-center  tw-text-sm tw-font-medium tw-text-white'>
                    Xem thêm
                  </Button> */}
                </div>
              ))
            }
          </div>
        </div>
      )}
      {isLoading && (
        <div className='tw-flex tw-items-center tw-justify-center tw-min-h-[45vh]'>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default EventsPage;
