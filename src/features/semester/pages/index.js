import { Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import Img1 from './../../../assets/images/CNDT1.png';
import FormSemeterRef from '../components/FormSemeterRef';
import Spinner from '../../../components/Spinner';

const SemesterPage = () => {
  const { data, error, isLoading } = useGetAllSemesterQuery();

  const modalRef = React.useRef();

  return (
    <>
      {error && (
        <Typography.Text type='danger'>{error.message}</Typography.Text>
      )}

      <div>
        <div className='tw-absolute tw-right-[5%] -tw-mt-4 md:tw-right-[2%] '>
          <Button
            className='hover:tw-bg-orange-00 tw-flex tw-items-center tw-rounded-md tw-border tw-border-transparent tw-bg-orange-400  tw-px-2 tw-text-slate-100 dark:tw-border dark:tw-border-white  dark:tw-bg-transparent  '
            type='primary'
            onClick={() => modalRef.current.show('ADD')}
          >
            <div className='tw-flex tw-items-center '>
              <PlusCircleOutlined className='tw-mr-1' /> Thêm kỳ học
            </div>
          </Button>
        </div>
      </div>
      <Spinner
        loading={isLoading}
        size='large'
        className={
          'tw-my-auto tw-mt-10 tw-min-h-[200px] tw-flex tw-items-center tw-justify-center'
        }
      />
      {data && (
        <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4'>
          {data?.map((item, index) => (
            <div
              key={index}
              className='bg-neutral-400 tw-mx-6 tw-my-6  tw-rounded-[3px] tw-border tw-shadow-transparent tw-drop-shadow-xl hover:tw-border-gray-400 hover:tw-opacity-[90%] dark:tw-border-gray-500 dark:hover:tw-border-white'
            >
              <div>
                <Link to={`/manage/sem/${item.id}`}>
                  <img
                    className='tw-w-full tw-rounded-t-[3px]'
                    src={Img1}
                    alt=''
                  />
                </Link>
              </div>
              <div className='tw-flex tw-w-full tw-items-center tw-justify-between'>
                <Link
                  className='tw-pl-[10px] tw-text-[16px] tw-font-medium tw-leading-[50px] tw-text-black hover:tw-text-amber-500 dark:tw-text-slate-200 dark:hover:tw-text-[#ffa500]'
                  to={`/manage/sem/${item.id}`}
                >
                  {item.name}
                </Link>
                <div className='tw-mr-[10px]'>
                  <Button
                    shape='circle'
                    onClick={() => modalRef.current.show('EDIT', item)}
                    icon={<EditOutlined className='tw-text-[20px]' />}
                    className='tw-border-none tw-bg-transparent hover:tw-bg-transparent dark:tw-text-slate-400 dark:hover:tw-text-blue-500'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <FormSemeterRef ref={modalRef} />
    </>
  );
};

export default SemesterPage;
