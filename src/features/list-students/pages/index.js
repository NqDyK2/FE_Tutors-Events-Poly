import React from 'react'
import { Button, Image, Input, Table, Spin,} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './style.css'
import {FaReply} from 'react-icons/fa'
import { Link, useLocation, useParams } from 'react-router-dom';
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
    width: '10%'
  },
  {
    title: 'Họ tên',
    dataIndex: 'studentName',
    key: 'studentName',
    width: "15%"
  },
  {
    title: 'Mã sinh viên',
    dataIndex: 'studentCode',
    key: 'studentCode',
    width: '10%'
  },
  {
    title: 'Email',
    dataIndex: 'studentMail',
    key: 'studentMail',
    width: '20%'
  },
  {
    title: 'Ảnh',
    key: 'image',
    dataIndex: 'image',
    render: (_, record) => (
      <Image preview={false} width={70} src={record.image} alt="IMG" />
    ),
    width: '10%'
  },
  {
    title: 'Chú thích',
    dataIndex: 'comment',
    key: 'comment',
    render: (_, record) => (
      <Input className='tw-rounded' value={record.comment} />
    ),
  }
];

const ListStudent = () => {
  const location = useLocation();
  
  const { subjectId: id, semesterId: semester_id } = location.state || [] ;
  
  const { data: listStudent, error, isLoading } = useGetListStudentInCLassQuery(id);

  let list = listStudent?.data.map((item, index) => ({
    key: index,
    index,
    className: item.school_classroom,
    studentCode: item.user_code,
    image: item.avatar,
    comment: item.reason,
    studentMail: item.email,
    studentName: item.name
  }))

  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2 tw-pb-1 tw-flex tw-justify-between'>
        <span className='tw-text-[15px]'>Danh sách sinh viên</span>
        <Link to="/add-lesson" state={{ semester_id, id }}><span><Button className='tw-justify-end hover:tw-bg-blue-500 hover:tw-text-white'> Thêm buổi học </Button></span></Link>
        <Link to={`/manage/sem/${semester_id}`} className='tw-flex tw-items-center hover:tw-text-blue-600'> 
          <FaReply className='tw-mr-1'/> Trở lại 
        </Link>
      </div>

      {isLoading && <p className='tw-flex tw-justify-center tw-mt-[110px]'><Spin tip="Loading..."/></p>}

      {error && (
        <>
          <p className='tw-pt-4'>Có lỗi xảy ra!</p>
          <Link to='/semesters'>Trở lại</Link>
        </>
      )}

      {listStudent && (
        <div className='tw-mt-6'>
          <Table scroll={{ y: 400 }} key={list.key} columns={columns} dataSource={list} pagination={false} />
          {/* <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} /> */}
        </div>
      )}
    </div>
  )
}

export default ListStudent