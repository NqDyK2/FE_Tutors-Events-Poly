import React from 'react';
import { Button, Input, Table } from 'antd';
import './style.css';
import { FaReply } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetListStudentInCLassQuery } from '../../../app/api/semesterApiSlice';
import Spinner from '../../../components/Spinner';

const columns = [
  {
    title: '#',
    key: 'index',
    render: (_, record) => (
      <span className='tw-font-bold'>{record.index + 1}</span>
    ),
    width: '5%',
  },
  {
    title: 'Họ tên',
    dataIndex: 'studentName',
    key: 'studentName',
    width: '15%',
  },
  {
    title: 'Mã sinh viên',
    dataIndex: 'studentCode',
    key: 'studentCode',
    width: '10%',
  },
  {
    title: 'Email',
    dataIndex: 'studentMail',
    key: 'studentMail',
    width: '20%',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: '15%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'stt',
    key: 'stt',
    width: '20%',
    render: (_, record) => (
      <Button className='tw-w-[100px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400'>
        Mời lại.
      </Button>
    )
  }
];

const ListStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { subjectId: id, semesterId: semester_id } = location.state || [];

  const {
    data: listStudent,
    error,
    isLoading,
  } = useGetListStudentInCLassQuery(id);

  let list = listStudent?.data.map((item, index) => ({
    key: index,
    index,
    phone: item.phone_number,
    studentCode: item.code,
    studentMail: item.email,
    studentName: item.name,
    stt: 'Đã tham gia',
  }));

  return (
    <div className='tw-w-full'>
      <div className='tw-flex tw-justify-between tw-border-b-2 tw-pb-1'>
        <span className='tw-text-[15px] dark:tw-text-white'>Danh sách sinh viên</span>

        <button
          onClick={() => navigate(-1)}
          className='tw-flex tw-items-center tw-text-blue-500 hover:tw-text-blue-700 hover:tw-bg-transparent'
        >
          <FaReply className='tw-mr-1' /> Trở lại
        </button>
      </div>

      {isLoading && (
        <div className='tw-mt-[110px] tw-flex tw-justify-center'>
          <Spinner tip={<p className='tw-text-orange-300 dark:tw-text-white'>Loading</p>} />
        </div>
      )}

      {error && (
        <>
          <p className='tw-pt-4'>Có lỗi xảy ra!</p>
          <Link to={`/manage/sem/${semester_id}`}>Trở lại</Link>
        </>
      )}

      {listStudent && (
        <div className='tw-mt-6'>
          <Table
            scroll={{ y: 400 }}
            key={list.key}
            columns={columns}
            dataSource={list}
            pagination={false}
          />
          {/* <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} /> */}
        </div>
      )}
    </div>
  );
};

export default ListStudent;
