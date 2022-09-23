import React from 'react'
import { Image, Input, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useParams } from 'react-router-dom';
import { useGetListStudentInCLassQuery } from '../../../app/api/semesterApiSlice';

const columns = [
  {
    title: '#',
    key: 'index',
    render: (_, record) => (
      <span className='tw-font-bold'>{record.index + 1}</span>
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
    title: 'Email',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: 'Ảnh',
    key: 'image',
    dataIndex: 'image',
    render: (_, record) => (
      <Image width={70} src={record.image} alt="IMG" />
    ),
  },
  {
    title: 'Chú thích',
    dataIndex: 'comment',
    key: 'comment',
    render: (_, record) => (
      <Input className='tw-rounded' value={record.comment} />
    ),
    width: '25%'
  }
];

const ListStudent = () => {
  const { id } = useParams();
  const { data: listStudent, error, isLoading } = useGetListStudentInCLassQuery(id);

  let list = listStudent?.data.map((item, index) => ({
    key: index,
    index,
    className: item.school_classroom,
    studentCode: item.school_classroom,
    image: 'https://demoda.vn/wp-content/uploads/2022/02/anh-kaomoji-de-thuong-danh-nhau.jpg',
    comment: item.reason,
    studentName: item.user_email
  }))

  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px]'>Danh sách sinh viên</span>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {list && (
        <div className='tw-mt-6'>
          <Table scroll={{ y: 380 }} key={list.key} columns={columns} dataSource={list} pagination={false} />
          <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} />
        </div>
      )}
    </div>
  )
}

export default ListStudent