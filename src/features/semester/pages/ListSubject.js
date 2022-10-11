import React, { useRef } from 'react';
import { Button, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { useGetListClassInSemesterQuery } from '../../../app/api/semesterApiSlice';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormImportExcelRef from '../components/FormImportExcelRef';

const SubjectPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetListClassInSemesterQuery(id);

  const modalRef = useRef();

  return (
    <>
      <Helmet>
        <title>FPoly</title>
      </Helmet>

      <div className='tw-flex tw-justify-between tw-border-b-2 tw-pb-1'>
        <span className='tw-text-[15px] dark:tw-text-white'>Danh sách lớp học</span>
        <div className='tw-flex tw-items-center tw-gap-x-3'>
          <Button
            icon={<PlusCircleOutlined />}
            className='hover:tw-bg-transparent tw-flex tw-items-center tw-rounded-md tw-border-2   tw-px-2 dark:tw-text-slate-100 hover:tw-text-orange-600 tw-text-orange-500'
            type='text'
            onClick={() => modalRef.current.show()}
          >
            Import from excel
          </Button>
          <Link
            to={`/manage`}
            className='tw-flex tw-items-center hover:tw-text-blue-600'
          >
            <FaReply className='tw-mr-1' /> Trở lại
          </Link>
        </div>
      </div>

      <div className='tw-mt-4'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && (
          <List>
            <VirtualList
              data={data?.data}
              key={data?.data.id}
              height={400}
              itemKey='id'
              itemHeight={47}
            >
              {(item, idx) => (
                <List.Item key={idx + 1}>
                  <List.Item.Meta
                    key={item.id}
                    title={<span className='tw-uppercase'>{item.name}</span>}
                  />
                  <div>
                    <Link
                      to={`/manage/class/${item.id}`}
                      state={{ semesterId: id, subjectId: item.id }}
                      className='tw-mr-4'
                    >
                      Danh sách sinh viên
                    </Link>
                    <Link
                      to={`/manage/class/lesson/${item.id}`}
                      state={{
                        semesterId: id,
                        subjectId: item.id,
                        subjectName: item.name,
                        default_offline_class_location:
                          item.default_offline_class_location,
                        default_online_class_location:
                          item.default_online_class_location,
                        default_tutor_email: item.default_tutor_email,
                      }}
                      className='tw-mr-4'
                    >
                      Lịch học
                    </Link>
                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        )}
        <FormImportExcelRef ref={modalRef} />
      </div>
    </>
  );
};

export default SubjectPage;
