import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Result, Table } from 'antd';
import { useGetAttendanceListClassQuery } from '../../../../app/api/attendanceApiSlice';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Lớp',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Tên môn',
    dataIndex: 'subName',
    key: 'subName',
  },
  {
    title: 'Mã môn',
    dataIndex: 'subCode',
    key: 'subCode',
  },
  {
    title: 'Thời gian',
    dataIndex: 'cahoc',
    key: 'cahoc',
  },
  {
    title: 'Điểm danh',
    key: 'action',
    render: (_, record) => (
      <Button className='tw-w-[100px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white'>
        <Link
          to={`/diem-danh/${record.class}`}
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

const AttendanceList = () => {
  const {
    data: listData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAttendanceListClassQuery();
  const dataSource = listData?.data.map((item, index) => ({
    key: index + 1,
    day: item.start_time ? moment(item.start_time).format('DD/MM/YYYY') : '',
    class: item.id,
    subName: item.subject_name,
    subCode: item.subject_code,
    cahoc: item.start_time
      ? `${moment(item.start_time).format('HH:mm')} - ${moment(
          item.end_time
        ).format('HH:mm')}`
      : '',
  }));
  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2 tw-pb-1'>
        <span className='tw-text-[15px]'>Điểm danh</span>
      </div>
      {/* table antd */}
      <div className='tw-mt-6'>
        {isError && (
          <div>
            <Result status={'error'} title='Đã có lỗi xảy ra' />
          </div>
        )}
        <Table
          loading={isLoading}
          scroll={{ y: 380 }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default AttendanceList;
