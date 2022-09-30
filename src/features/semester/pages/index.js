import { List, Spin, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';

import Img1 from './../../../assets/images/CNDT1.png';

const SemesterPage = () => {
  const { data, error, isLoading } = useGetAllSemesterQuery();
  return (
    <>
      {error && <Typography.Text type='danger'>{error.message}</Typography.Text>}
      {isLoading && <Spin />}

      {data && (
        <div className='tw-flex tw-flex-wrap'>
          {data?.semester?.data.map((item, index) => (
            <div key={index} className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
              <Link to={`/manage/sem/${item.id}`}>
                <div>
                  <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
                </div>
                <div className='tw-w-max tw-h-[50px]'>
                  <Link
                    className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                    to=''
                  >
                    {item.name}
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}


    </>
  );
};

export default SemesterPage;