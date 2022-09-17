import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';

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
    title: 'Khu giảng đường',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ca học',
    dataIndex: 'cahoc',
    key: 'cahoc',
  },
  {
    title: 'Link trực tuyến',
    key: 'onLink',
    render: (_, record) => (
      <a href={record.onLink}>{record.onLink}</a>
    )
  },
  {
    title: 'Điểm danh',
    key: 'action',
    render: (_, record) => (
      <Button className='tw-w-[100px] tw-bg-[#0DB27F] tw-rounded-[4px] tw-text-white' >
        <Link to='/attendance-student'>Điểm danh</Link>
      </Button>
    ),
  },
];
const data = [
  {
    key: '1',
    day: 'Thứ Bảy 07/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Chủ Nhật 08/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Thứ Hai 09/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Thứ Hai 09/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Thứ Hai 09/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Thứ Hai 09/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },
  {
    key: '1',
    day: 'Thứ Hai 09/01/2023',
    class: 32,
    subName: 'Lập trình Front-End Framework 2',
    subCode: 'WEB209',
    room: 'Google Meet 2',
    address: 'Google Meet',
    cahoc: 6,
    onLink: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
  },

];

const AttendanceList = () => {
  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px]'>Điểm danh</span>
      </div>
      {/* table antd */}
      <div className='tw-mt-6'>
        <Table scroll={{ y: 380 }} columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default AttendanceList