import React, { useRef } from 'react';
import { Button, Space, Spin, Table } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { useGetListClassInSemesterQuery } from '../../../app/api/semesterApiSlice';
import { PlusCircleOutlined } from '@ant-design/icons';
import FormImportExcelRef from '../components/FormImportExcelRef';
import ModalListSubject from './ModalListSubject';

const SubjectPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetListClassInSemesterQuery(id);
  const modalRef = useRef();

  // table antd
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
    },
    {
      title: 'Lớp',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Link to={`/manage/class/${record.id}`}>
          <div className='tw-capitalize'>{record.name}</div>
        </Link>
      )
    },
    {
      title: 'Mã môn',
      dataIndex: 'subject_code',
      key: 'subject_code',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'default_teacher_email',
      key: 'default_teacher_email',
    },
    {
      title: 'Buổi học',
      dataIndex: 'lessons_count',
      key: 'lessons_count',
    },
    {
      title: 'Sinh viên',
      dataIndex: 'class_students_count',
      key: 'class_students_count',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ModalListSubject />
        </Space>
      ),
    },
  ];
  const dataSource = data?.data?.map((item, index) => ({
    key: index + 1,
    id: item.id,
    name: item.name,
    subject_code: item.subject_code,
    default_teacher_email: item.default_teacher_email,
    lessons_count: item.lessons_count,
    class_students_count: item.class_students_count
  }))

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
        {isLoading && <Spin />}
        {error && <p>Error</p>}
        {data && (
          <Table
            size="small"
            scroll={{ y: 380 }}
            dataSource={dataSource}
            columns={columns}
          />
        )}
        <FormImportExcelRef ref={modalRef} />
      </div>
    </>
  );
};

export default SubjectPage;
