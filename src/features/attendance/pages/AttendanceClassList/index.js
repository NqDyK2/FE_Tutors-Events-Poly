import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import { useGetAttendanceListClassQuery, } from '../../../../app/api/attendanceApiSlice';
import Spinner from '../../../../components/Spinner';
import { Helmet } from 'react-helmet-async';

const columns = [

  {
    title: 'Môn học',
    dataIndex: 'subName',
    key: 'subName',
  },

  {
    title: 'Mã môn',
    dataIndex: 'subCode',
    key: 'subCode',
  },
  {
    title: 'Buổi học',
    dataIndex: 'lessonsCount',
    key: 'lessonsCount',
  },
  {
    title: 'Sinh viên',
    dataIndex: 'classStudentsCount',
    key: 'classStudentsCount',
  },
  {
    title: 'Điểm danh',
    key: 'action',
    render: (_, record) => (
      <Button className='tw-w-[100px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400'>
        <Link
          to={`/diem-danh/lop/${record.id}`}
          state={{
            subjectCode: record.subName,
          }}
        >
          Điểm danh
        </Link>
      </Button>
    ),
  },
];

const AttendanceClassList = () => {
  const {
    data: listData,
    isLoading,
    error,
  } = useGetAttendanceListClassQuery();
  const dataSource = listData?.data.map((item, index) => ({
    key: index + 1,
    id: item.id,
    subName: item.subject_name,
    subCode: item.subject_code,
    lessonsCount: item.lessons_count,
    classStudentsCount: item.class_students_count,
  }));
  return (
    <>
      <Helmet>
        <title>Điểm danh</title>
      </Helmet>
      <div className='tw-w-full'>
        <div className='tw-border-b-2 tw-pb-1'>
          <span className='tw-text-[15px] dark:tw-text-white'>Lớp có thể điểm danh</span>
        </div>
        {/* table antd */}
        <div className='tw-mt-6'>
          {error && (
            <div>
              <p className='tw-font-medium tw-text-red-500'>
                {error?.response?.data?.message ||
                  error?.data?.message ||
                  error?.message ||
                  'Đã có lỗi xảy ra!'}
              </p>
            </div>
          )}
          <Table
            scroll={{ y: 380 }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            loading={{
              indicator: <Spinner />,
              spinning: isLoading,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceClassList;
