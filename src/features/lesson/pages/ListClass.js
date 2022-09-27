import React from 'react'

import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';

const columns = [
  {
    title: 'Lớp',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Giảng viên',
    dataIndex: 'giangvien',
    key: 'giangvien',
  },
  {
    title: 'Người hướng dẫn',
    dataIndex: 'nguoihuongdan',
    key: 'nguoihuongdan',
  },
  {
    title: 'Chuyên ngành',
    dataIndex: 'nganh',
    key: 'nganh',
  },
  {
    title: 'Link trực tuyến',
    key: 'onLink',
    render: (_, record) => (
      <a href={record.onLink}>{record.onLink}</a>
    ),
  },
  {
    title: 'Buổi học',
    key: 'action',
    render: (_, record) => (
      <Button className=' tw-bg-[#0DB27F] tw-rounded-[4px] tw-text-white' >
        <Link to='/add-lesson'>Thêm buổi học</Link>
      </Button>
    ),
  },
];
const data = [
  {
    class: 'web16305',
    giangvien: 'datlt34',
    nguoihuongdan: 'hieuthuongtin',
    nganh: 'Thiết kế website',
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    class: 'web16305',
    giangvien: 'datlt34',
    nguoihuongdan: 'hieuthuongtin',
    nganh: 'Thiết kế website',
    onLink: '',
  },
  {
    class: 'web16305',
    giangvien: 'datlt34',
    nguoihuongdan: 'hieuthuongtin',
    nganh: 'Thiết kế website',
    onLink: '',
  },
];

const ListClass = () => {
  return (
    <div>
      <div className='tw-w-full'>
        {/* table antd */}
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default ListClass