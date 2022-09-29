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
    title: 'Phòng',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Thời gian',
    dataIndex: 'cahoc',
    key: 'cahoc',
  },
  {
    title: 'Link trực tuyến',
    key: 'onLink',
    render: (_, record) => <a href={record.onLink}>{record.onLink}</a>,
  },
  {
    title: 'Điểm danh',
    key: 'action',
    render: (_, record) => (
      <Button className='tw-w-[100px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white'>
        <Link to={`/attendance-student/${record.class}`}>Điểm danh</Link>
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
    day: moment(item.day).format('DD/MM/YYYY'),
    class: item.id,
    subName:item.classroom.name,
    subCode: item.classroom.name,
    room: item.class_location,
    cahoc: `${
      moment(item.start_time).format('HH:mm') 
    } - ${moment(item.end_time).format('HH:mm') }`,
    onLink: 'Đoán xem ?',
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
            <Result status={'error'} 
            title='Đã có lỗi xảy ra'
            />
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
