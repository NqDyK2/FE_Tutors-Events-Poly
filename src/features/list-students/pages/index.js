import React, { useEffect } from 'react';
import { Input, Table, Tag } from 'antd';
import './style.css';
import { FaReply } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetListStudentInCLassQuery } from '../../../app/api/semesterApiSlice';
import Spinner from '../../../components/Spinner';
import { Helmet } from 'react-helmet-async';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import { useDispatch } from 'react-redux';
import UpdateStudentModal from '../components/UpdateStudentModal';

const columns = [
  {
    title: '#',
    key: 'index',
    render: (_, record) => (
      <span className="tw-font-bold">{record.index + 1}</span>
    ),
    width: '5%',
  },
  {
    title: 'Họ tên',
    key: 'studentName',
    width: '15%',
    render: (_, record) => (
      <>
        {record.is_warning === 0 ? (
          <Tag color="success">{record.studentName}</Tag>
        ) : (
          <Tag color="error">{record.studentName}</Tag>
        )}
      </>
    ),
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
    title: 'Nguyên nhân',
    dataIndex: 'reason',
    key: 'reason',
    width: '20%',
    render: (_, record) => (
      <Input
        className="tw-truncate tw-text-[#292524]"
        value={`${record.reason}`}
        disabled
      />
    ),
  },
  {
    dataIndex: 'action',
    key: 'action',
    width: '5%',
    render: (_, record) => (
      <div className="tw-float-right tw-flex tw-items-center">
        <UpdateStudentModal data={record} />
      </div>
    ),
  },
];

const ListStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subjectId: id, semesterId: semester_id } = location.state || [];

  const {
    data: listStudent,
    error,
    isLoading,
  } = useGetListStudentInCLassQuery(id);

  useEffect(() => {
    if (!listStudent?.tree) return;
    dispatch(
      setFlexBreadcrumb([
        { title: 'Quản lý kỳ học', path: `/manage` },
        {
          title: listStudent?.tree[0]?.name,
          path: `/manage/sem/${listStudent?.tree[0]?.id}`,
        },
        { title: listStudent?.tree[1]?.name + ' - Sinh viên' },
      ]),
    );
  }, [dispatch, listStudent]);

  let list = listStudent?.data.map((item, index) => ({
    key: index,
    index,
    id,
    phone: item?.phone_number,
    studentCode: item?.code,
    studentMail: item?.email,
    studentName: item?.name,
    join: item?.is_joined,
    reason: item?.reason ?? '',
    is_warning: item?.is_warning,
  }));

  return (
    <>
      <Helmet>
        <title>Sinh viên</title>
      </Helmet>
      <div className="tw-w-full">
        <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
          <span className="tw-text-[15px] dark:tw-text-white">
            Danh sách sinh viên
          </span>

          <button
            onClick={() => navigate(-1)}
            className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
          >
            <FaReply className="tw-mr-1" /> Trở lại
          </button>
        </div>

        {isLoading && (
          <div className="tw-mt-[110px] tw-flex tw-justify-center">
            <Spinner
              tip={
                <p className="tw-text-orange-300 dark:tw-text-white">Loading</p>
              }
            />
          </div>
        )}

        {error && (
          <>
            <p className="tw-pt-4">Có lỗi xảy ra!</p>
            <Link to={`/manage/sem/${semester_id}`}>Trở lại</Link>
          </>
        )}

        {listStudent && (
          <div className="tw-mt-6">
            <Table
              scroll={{ x: 400 }}
              key={list.key}
              columns={columns}
              dataSource={list}
            />
            {/* <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ListStudent;
