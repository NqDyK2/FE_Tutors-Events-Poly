import React from 'react'
import { Image, Input, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const onChangeComment = (e) => {
  console.log(e.target.value);
};

const columns = [
  {
    title: '#',
    key: 'index',
    render: (_, record) => (
        <span className='tw-font-bold'>{record.index}</span>
    ),
    width: "5%"
  },
  {
    title: 'Tên lớp',
    dataIndex: 'className',
    key: 'className',
  },
  {
    title: 'Mã sinh viên',
    dataIndex: 'studentCode',
    key: 'studentCode',
  },
  {
    title: 'Tên sinh viên',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: 'Ảnh',
    key: 'image',
    dataIndex: 'image',
    render: (_, record) => (
        <Image width={70} src= {record.image} alt="IMG"/>
    ),
  },
  {
    title: 'Chú thích',
    dataIndex: 'comment',
    key: 'comment',
    render: (_, record) => (
        <Input className='tw-rounded' onChange={onChangeComment}/>
    ),
    width: '25%'
  }
];
const data = [
  {
    key: 1,
    index: 1,
    className: "WE16304",
    studentCode: 'PH18088',
    studentName: 'Nguyễn Văn A',
    image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
    comment: ''
  },
  {
    key: 2,
    index: 2,
    className: "WE16304",
    studentCode: 'PH18099',
    studentName: 'Nguyễn Văn B',
    image: '',
    comment: ''
  },
  {
    key: 3,
    index: 3,
    className: "WE16304",
    studentCode: 'PH18087',
    studentName: 'Nguyễn Văn C',
    image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
    comment: ''
  },
  {
    key: 4,
    index: 4,
    className: "WE16304",
    studentCode: 'PH17088',
    studentName: 'Nguyễn Văn D',
    image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg', 
    comment: 'Dốt dcd'
  },
  {
    key: 5,
    index: 5,
    className: "WE16304",
    studentCode: 'PH15088',
    studentName: 'Nguyễn Văn E',
    image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
    comment: ''
  },

];

const ListStudent = () => {
  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px]'>Danh sách sinh viên</span>
      </div>
      {/* table antd */}
      <div className='tw-mt-6'>
        <Table key={data.key} columns={columns} dataSource={data} pagination={false}  />
        <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} />
      </div>
    </div>
  )
}

export default ListStudent