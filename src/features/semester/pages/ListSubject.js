import React from 'react';
import { List} from 'antd';
import VirtualList from 'rc-virtual-list';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {FaReply} from 'react-icons/fa'
import { useGetListClassInSemesterQuery } from '../../../app/api/semesterApiSlice';

const SubjectPage = () => {
  const {id} = useParams();
  const { data, error, isLoading } = useGetListClassInSemesterQuery(id);
  
  return (
    <>
    
      <Helmet>
        <title>FPoly</title>
      </Helmet>

      <div className='tw-border-b-2 tw-pb-1 tw-flex tw-justify-between'>
          <span className='tw-text-[15px]'>Danh sách môn</span>
          <Link to={`/semesters`} className='tw-flex tw-items-center hover:tw-text-blue-600'> 
            <FaReply className='tw-mr-1'/> Trở lại 
          </Link>
      </div>
      
      <div className='tw-mt-6'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && (
          <List
          >
          <VirtualList
            data={data?.data}
            key={data?.data.id}
            height={400}
            itemHeight={47}
          >
            {(item, idx) => (
              <List.Item key={idx + 1}>
                <List.Item.Meta key={item.id}
                  title={
                    <Link 
                      to={`/manage/class/${item.id}`} 
                      state={{semesterId: id, subjectId: item.id}} 
                      className="tw-uppercase"
                    >
                      {item.name}
                    </Link>
                  }
                />
                <div>
                  <Link 
                    to={`/manage/class/${item.id}`} 
                    state={{semesterId: id, subjectId: item.id}} 
                    className="tw-mr-4"
                  >
                    Danh sách sinh viên
                  </Link>
                  <Link 
                    to={`/manage/class/lesson/${item.id}`} 
                    state={{semesterId: id, subjectId: item.id}} 
                    className="tw-mr-4"
                  >
                    Lịch học
                  </Link>
                </div>
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
