import { Button, List, Spin, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import Img1 from './../../../assets/images/CNDT1.png';
import FormSemeterRef from '../components/FormSemeterRef';

const SemesterPage = () => {
  const { data, error, isLoading } = useGetAllSemesterQuery();

  const modalRef = React.useRef();

  return (
    <>
      {error && (
        <Typography.Text type='danger'>{error.message}</Typography.Text>
      )}
      {isLoading && <Spin />}
        <div>
          <div className='tw-flex tw-justify-end tw-items-center -tw-mb-4'>
             <Button  icon={<PlusCircleOutlined />} className="tw-items-center tw-flex tw-bg-white tw-text-gray-900 tw-border-slate-900 hover:tw-bg-orange-400 hover:tw-text-slate-200" type='primary' onClick={() => modalRef.current.show()}>
              Thêm học kỳ
             </Button>
          </div>
        </div>
      {data && (
        <div className='tw-flex tw-flex-wrap'>
          {data?.semester?.data.map((item, index) => (
            <div
              key={index}
              className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'
            >
              <div>
                <Link to={`/manage/sem/${item.id}`}>
                  <img
                    className='tw-w-[240px] tw-rounded-t-[3px]'
                    src={Img1}
                    alt=''
                  />
                </Link>
              </div>
              <div className='tw-w-full tw-flex tw-items-center tw-justify-between'>
                <Link
                  className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                  to={`/manage/sem/${item.id}`}
                >
                  {item.name}
                </Link>
                <div className='tw-mr-[10px]'>
                  <Button
                    shape='circle'
                    onClick={() => modalRef.current.show()}
                    icon={<EditOutlined className='tw-text-[20px]' />}
                    className='tw-bg-transparent tw-border-none hover:tw-bg-transparent'
                  />
                </div>
              </div>
            </div>
          ))}
          <FormSemeterRef ref={modalRef}/>
        </div>
      )}
    </>
  );
};

export default SemesterPage;
