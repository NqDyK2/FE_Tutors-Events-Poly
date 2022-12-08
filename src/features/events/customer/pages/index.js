/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, Row } from 'antd';
import React from 'react';
import parse from 'html-react-parser';

// import image
import img1 from '../../../../assets/images/9-fptsetochuc_CEKW 1.png';
import img2 from '../../../../assets/images/Anh-bia-Top-10 1.png';
import img3 from '../../../../assets/images/su-kien-cong-nghe-lon-nhat-cua-fpt-sap-dien-ra-1573035901 1.png';
import img4 from '../../../../assets/images/9-fptsetochuc_CEKW 1.png';
import { useGetAllEventQuery } from '../../../../app/api/eventApiSlice';

const EventsPage = () => {
  const { data, isLoading, error } = useGetAllEventQuery();
  return (
    <>
      {data && (
        <div>
          <Row gutter={[24, 16]}>
            {
              data.data?.map((item, index) => (
                <Col span={6} className='tw-text-center tw-w-96 truncate'>
                  <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} className='tw-w-full tw-mb-10' />
                  <span className='tw-text-xl dark:tw-text-white'> {item.name} </span> <br />
                  {/* <div className='tw-h-48'>
                    <p className='dark:tw-text-white truncate tw-mb-4'>
                      {parse(item.content)}
                    </p>
                  </div> */}
                  <Button className=' tw-mt-5 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-mr-2 tw-mb-2 tw-w-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-cyan-500 tw-border-transparent tw-to-blue-500 tw-text-center  tw-text-sm tw-font-medium tw-text-white'>
                    Xem thêm
                  </Button>
                </Col>
              ))
            }
          </Row>
        </div>
      )}
    </>
  );
};

export default EventsPage;
