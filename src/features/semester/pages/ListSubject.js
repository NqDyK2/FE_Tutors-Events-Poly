import React, { useEffect, useRef } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  EditOutlined,
  SendOutlined,
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
import { exportExcel, exportPdf } from '../../../utils/exportFile';
import moment from 'moment';
import ExportDropDown from '../../../components/ExportDropDown';
import { useSendMailStudentsMutation } from '../../../app/api/studentApiSlice';
import FormImportResultRef from '../components/FormImportResultRef';
import ModalViewFB from '../components/ModalViewFB';

const SubjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllClassInSemesterQuery(id, {
    skip: !id,
    pollingInterval: 2000000,
  });
  const componentRef = useRef();
  const [removeClassroom] = useDeleteClassroomMutation();
  const [sendMailStudents] = useSendMailStudentsMutation();
  const modalImportExcelRef = useRef();
  const modalImportResultRef = useRef();
  const params = useParams();
  const modalClassroomRef = useRef();
  const semesterId = params.id;
  const currentUser = useSelector(selectCurrentUser);
  const handleRemoveClassroom = (id) => {
    removeClassroom(id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => toast.error(err.data.message));
  };

  const handleSendMailStudents = () => {
    sendMailStudents({ semester_id: id })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => toast.error(err.data.message));
  };

  // const exportTableExcel = () => {
  //   const table = document.getElementsByTagName('table')[0];
  //   exportExcel(
  //     table,
  //     'Danh s??ch l???p h???c',
  //     `Danh s??ch l???p h???c ${data?.tree[0]?.name} ${moment(new Date()).format(
  //       'DD-MM-YYYY',
  //     )}`.trim(),
  //   );
  // };

  // const exportTalePdf = () => {
  //   const table = document.getElementsByTagName('table')[0];
  //   exportPdf(
  //     table,
  //     `Danh s??ch l???p h???c ${data?.tree[0]?.name} ${moment(new Date()).format(
  //       'DD-MM-YYYY',
  //     )}`.trim(),
  //   );
  // };

  useEffect(() => {
    if (!data?.tree) return;

    dispatch(
      setFlexBreadcrumb([
        { title: 'Qu???n l?? k??? h???c', path: `/manage` },
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
      title: 'L???p',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (name, record) => (
        <Tooltip
          title="Xem l???ch gi???ng d???y"
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
            }}
          >
            <div className="tw-uppercase dark:hover:tw-text-hoverLink">
              {name}
            </div>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'M?? m??n',
      dataIndex: 'subject_code',
      key: 'subject_code',
      width: '10%',
      render: (subject_code, record) => (
        <div className="tw-uppercase">{subject_code}</div>
      ),
    },
    {
      title: 'Gi???ng vi??n',
      dataIndex: 'default_teacher_email',
      key: 'default_teacher_email',
      width: '20%',
      render: (default_teacher_email, record) =>
        default_teacher_email ? (
          default_teacher_email
        ) : (
          <span className="tw-font-semibold tw-text-red-500">Ch??a c??</span>
        ),
    },
    {
      title: 'Bu???i h???c',
      dataIndex: 'lessons_count',
      key: 'lessons_count',
      width: '10%',
      render: (_, record) =>
        record.lessons_count === 0 ? (
          <span className="tw-font-semibold tw-text-red-500">Ch??a c??</span>
        ) : (
          record.lessons_count
        ),
    },
    {
      title: 'Sinh vi??n',
      dataIndex: 'class_students_count',
      key: 'class_students_count',
      width: '10%',
      render: (class_students_count, record) =>
        class_students_count !== 0 ? (
          <Tooltip
            title="Xem danh s??ch sinh vi??n"
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
              <div className="dark:hover:tw-text-hoverLink">
                {class_students_count}
              </div>
            </Link>
          </Tooltip>
        ) : (
          <span className="tw-font-semibold tw-text-red-500">
            Ch??a c?? sinh vi??n
          </span>
        ),
    },
    {
      title: 'Ph???n h???i/G??p ??',
      dataIndex: 'feedback',
      key: 'feedback',
      width: '15%',
      render: (_, record) => <ModalViewFB id={record} />
      // (
      //   <Tooltip title="Xem ph???n h???i/g??p ?? c???a l???p" placement='topLeft' color={'#FF6D28'} >
      //     <Link to={`/manage/feedback`}>
      //       <div>Xem pha??n h????i</div>
      //     </Link>
      //   </Tooltip>
      // )
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="tw-flex tw-items-center tw-justify-end">
          <Tooltip
            title="Thay ?????i gi???ng vi??n ph??? tr??ch"
            placement="top"
            color={'#FF6D28'}
          >
            <Space
              size="middle"
              className="tw-border-none tw-bg-transparent hover:tw-bg-transparent dark:tw-text-white"
            >
              <Button
                className="tw-cursor-pointer tw-border-0 tw-bg-transparent tw-shadow-none hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink"
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
              <Tooltip title="X??a l???p h???c" placement="top" color={'#FF6D28'}>
                <Button className="tw-border-0 tw-bg-transparent tw-pl-3 tw-shadow-none hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            }
            title={`X??c nh???n x??a l???p h???c n??y?`}
            onConfirm={() => handleRemoveClassroom(record.id)}
            placement="topRight"
          />
        </div>
      ),
    },
  ];

  if (currentUser?.role_id !== 1) {
    columns = columns.filter((col) => col.dataIndex !== 'action' && col.dataIndex !== 'feedback');
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
        <title>L???p h???c</title>
      </Helmet>

      <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
        <span className="tw-text-[15px] dark:tw-text-white">
          Danh s??ch l???p h???c
        </span>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          {currentUser?.role_id === 1 && (
            <>
              <Button
                icon={<PlusCircleOutlined />}
                className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100 dark:hover:tw-text-blue-500"
                type="link"
                onClick={() => modalClassroomRef.current.show('ADD')}
              >
                Th??m l???p h???c
              </Button>

              <Button
                icon={<PlusCircleOutlined />}
                className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-hoverLink hover:tw-bg-transparent hover:tw-text-orange-600 dark:tw-text-slate-100 dark:hover:tw-text-hoverLink"
                type="text"
                onClick={() => modalImportExcelRef.current.show()}
              >
                Th??m sinh vi??n 1/3 block
              </Button>
              <Button
                icon={<PlusCircleOutlined />}
                className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-hoverLink hover:tw-bg-transparent hover:tw-text-orange-600 dark:tw-text-slate-100 dark:hover:tw-text-hoverLink"
                type="text"
                onClick={() => modalImportResultRef.current.show()}
              >
                C???p nh???t danh s??ch sinh vi??n
              </Button>
              <ConfirmPopup
                className="tw-m-0"
                content={
                  <Button
                    icon={<SendOutlined />}
                    className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100 dark:hover:tw-text-blue-500"
                    type="text"
                  >
                    G???i mail m???i sinh vi??n
                  </Button>
                }
                title={`G???i mail t???i nh???ng sinh vi??n Warning? Ti???p t???c?`}
                onConfirm={() => handleSendMailStudents()}
                placement="topRight"
              />
              {data?.data?.length > 0 && (
                <ExportDropDown
                  tableEl={document.getElementsByTagName('table')[0]}
                  data={data}
                  fileName="Danh s??ch l???p h???c"
                  sheetName="Danh s??ch l???p h???c"
                  elRef={componentRef}
                />
              )}
            </>
          )}
          <button
            onClick={() => navigate(-1)}
            className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
          >
            <FaReply className="tw-mr-1" /> Tr??? l???i
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
          scroll={{ x: 380 }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          ref={componentRef}
          loading={{ indicator: <Spinner />, spinning: isLoading }}
        />
        <FormClassroomRef semester_id={semesterId} ref={modalClassroomRef} />
        <FormImportExcelRef ref={modalImportExcelRef} />
        <FormImportResultRef ref={modalImportResultRef} />
      </div>
    </>
  );
};

export default SubjectPage;
