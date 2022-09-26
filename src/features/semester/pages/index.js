import { List, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';

import Img1 from './../../../assets/images/CNDT1.png';

const SemesterPage = () => {
  const { data, error, isLoading } = useGetAllSemesterQuery();
  console.log(data);
  return (
    <>
      {error && <Typography.Text type='danger'>{error.message}</Typography.Text>}
      <List
        header={<div>Semesters</div>}
        dataSource={data?.semester?.data}
        bordered
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/semesters/${item.id}`}> {item.name} </Link>
          </List.Item>
        )}
      ></List>
      {/* Tạm thời comment lại nhé các cụ */}
      <div className='tw-flex tw-flex-wrap'>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 1
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 2
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 3
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 4
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 5
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 6
              </Link>
            </div>
          </Link>
        </div>
        <div className='tw-w-[240px] tw-border bg-neutral-400 tw-rounded-[3px] tw-shadow-transparent hover:tw-opacity-[90%] tw-mx-6 tw-my-6 tw-drop-shadow-xl hover:tw-border-gray-400'>
          <Link to='' >
            <div>
              <img className='tw-w-[240px] tw-rounded-t-[3px]' src={Img1} alt='' />
            </div>
            <div className='tw-w-max tw-h-[50px]'>
              <Link
                className='tw-text-black tw-text-[16px] tw-font-medium tw-leading-[50px] tw-pl-[10px] hover:tw-text-amber-400'
                to=''
              >
                Học kỳ 7
              </Link>
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default SemesterPage;