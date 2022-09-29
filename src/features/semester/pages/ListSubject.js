/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List} from 'antd';
import VirtualList from 'rc-virtual-list';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useGetListClassInSemesterQuery } from '../../../app/api/semesterApiSlice';

const SubjectPage = () => {
  const {id} = useParams();
  const { data, error, isLoading } = useGetListClassInSemesterQuery(id);
  
  console.log(data);
  return (
    <>
    
      <Helmet>
        <title>FPoly</title>
      </Helmet>
      <div className='tw-border-b-2'>
          <span className='tw-text-[15px]'>Danh sách môn.</span>
          <Button> Thêm buổi học </Button>
      </div>
      <div className='tw-mt-6'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && (
          <List>
          <VirtualList
            data={data?.data}
            height={400}
            itemHeight={47}
          >
            {(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  title={<Link to={`/semesters/liststudent/${item.id}`} className="tw-uppercase">{item.name}</Link>}
                />
                <div><Link to={`/semesters/liststudent/${item.id}`} className="tw-mr-4">Danh sách sinh viên</Link></div>
              </List.Item>
            )}
          </VirtualList>
        </List>
        )}
      </div>

    </>
  )
};

export default SubjectPage;
