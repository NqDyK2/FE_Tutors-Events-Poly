import React, { useEffect, useRef} from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { FaReply } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
  useDeleteClassroomMutation,
  useGetAllClassInSemesterQuery,
} from '../../../app/api/classroomApiSlice';
import FormImportExcelRef from '../components/FormImportExcelRef';
import Spinner from '../../../components/Spinner';
import FormClassroomRef from '../components/FormClassroomRef';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/authSlice';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';

const SubjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllClassInSemesterQuery(id);
  const [removeClassroom] = useDeleteClassroomMutation();
  const modalImportExcelRef = useRef();
  const modalClassroomRef = useRef();
  const location = useLocation();
  const { semesterStartTime, semesterEndTime, semesterId } =
    location.state || {};
  const currentUser = useSelector(selectCurrentUser);
  const handleRemoveClassroom = (id) => {
    removeClassroom(id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      });
  };

  useEffect(() => {
    if (!data?.tree) return;

    dispatch(
      setFlexBreadcrumb([
        { title: 'Quảng lý kỳ học', path: `/manage` },
        { title: data?.tree[0]?.name, path: `/manage/sem/${data.tree[0]?.id}` },
      ]),
    );
  }, [data, dispatch]);

  // table antd
  let columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
    },
    {
      title: 'Lớp',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Tooltip
          title="Xem lịch giảng dạy"
          placement="topLeft"
          color={'#FF6D28'}
          key={record.id}
        >
          <Link
            to={`/manage/class/lesson/${record.id}`}
            state={{
              semesterId: id,
              subjectId: record.id,
              subjectName: record.name,
              teacherEmail: record.default_teacher_email,
              semesterStartTime,
              semesterEndTime,
            }}
          >
            <div className="tw-uppercase">{name}</div>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'Mã môn',
      dataIndex: 'subject_code',
      key: 'subject_code',
      width: '10%',
      render: (subject_code, record) => (
        <div className="tw-uppercase">{subject_code}</div>
      ),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'default_teacher_email',
      key: 'default_teacher_email',
      width: '20%',
      render: (default_teacher_email, record) =>
        default_teacher_email ? (
          default_teacher_email
        ) : (
          <span className="tw-font-semibold tw-text-red-500">Chưa có</span>
        ),
    },
    {
      title: 'Buổi học',
      dataIndex: 'lessons_count',
      key: 'lessons_count',
      width: '10%',
    },
    {
      title: 'Sinh viên',
      dataIndex: 'class_students_count',
      key: 'class_students_count',
      width: '10%',
      render: (class_students_count, record) => (
        <Tooltip
          title="Xem danh sách sinh viên"
          placement="topLeft"
          color={'#FF6D28'}
          key={record.id}
        >
          <Link
            to={`/manage/class/${record.id}`}
            state={{
              semesterId: id,
              subjectId: record.id,
            }}
          >
            <div>{class_students_count}</div>
          </Link>
        </Tooltip>
      ),
    },
    // {
    //   title: 'Phản hồi/Góp ý',
    //   dataIndex: 'feedback',
    //   key: 'feedback',
    //   width: '15%',
    //   render: (_, record) => (
    //     <Tooltip title="Xem phản hồi/góp ý của lớp" placement='topLeft' color={'#FF6D28'} >
    //       <Link to={`/manage/feedback`}>
    //         <div >15</div>
    //       </Link>
    //     </Tooltip>
    //   )
    // },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="tw-flex tw-items-center">
          <Tooltip
            title="Thay đổi giảng viên phụ trách"
            placement="top"
            color={'#FF6D28'}
          >
            <Space
              size="middle"
              className="tw-border-none tw-bg-transparent hover:tw-bg-transparent dark:tw-text-white"
            >
              <Button
                className="tw-cursor-pointer tw-border-0 tw-bg-transparent tw-shadow-none hover:tw-bg-transparent dark:tw-text-white"
                onClick={() => modalClassroomRef.current.show('EDIT', record)}
              >
                <EditOutlined />
              </Button>
            </Space>
          </Tooltip>
          <ConfirmPopup
            key={record.id}
            className="tw-m-0"
            content={
              <Tooltip title="Xóa lớp học" placement="top" color={'#FF6D28'}>
                <Button className="tw-border-0 tw-bg-transparent tw-pl-3 tw-shadow-none hover:tw-bg-transparent dark:tw-text-white">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            }
            title={`Xác nhận xóa lớp học này?`}
            onConfirm={() => handleRemoveClassroom(record.id)}
            placement="topRight"
          />
        </div>
      ),
    },
  ];

  if (currentUser?.role_id !== 1) {
    columns = columns.filter((col) => col.dataIndex !== 'action');
  }

  const dataSource = data?.data?.map((item, index) => ({
    key: index + 1,
    id: item.id,
    name: item.subject_name,
    subject_code: item.subject_code,
    default_teacher_email: item.default_teacher_email,
    default_tutor_email: item.default_tutor_email,
    lessons_count: item.lessons_count,
    class_students_count: item.class_students_count,
  }));

  return (
    <>
      <Helmet>
        <title>Lớp học</title>
      </Helmet>

      <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
        <span className="tw-text-[15px] dark:tw-text-white">
          Danh sách lớp học
        </span>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          {currentUser?.role_id === 1 && (
            <>
              <Button
                icon={<PlusCircleOutlined />}
                className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100"
                type="link"
                onClick={() => modalClassroomRef.current.show('ADD')}
              >
                Thêm lớp học
              </Button>
              <Button
                icon={<PlusCircleOutlined />}
                className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-orange-500 hover:tw-bg-transparent hover:tw-text-orange-600 dark:tw-text-slate-100"
                type="text"
                onClick={() => modalImportExcelRef.current.show()}
              >
                Cập nhật danh sách sinh viên
              </Button>
            </>
          )}
          <button
            onClick={() => navigate(-1)}
            className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
          >
            <FaReply className="tw-mr-1" /> Trở lại
          </button>
        </div>
      </div>

      <div className="tw-mt-4">
        {error && (
          <p className="tw-font-medium tw-text-red-500">
            {error?.response?.data?.message || error?.data?.message}
          </p>
        )}
        <Table
          size="small"
          scroll={{ y: 380 }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={{ indicator: <Spinner />, spinning: isLoading }}
        />
        <FormClassroomRef semester_id={semesterId} ref={modalClassroomRef} />
        <FormImportExcelRef ref={modalImportExcelRef} />
      </div>
    </>
  );
};

export default SubjectPage;
