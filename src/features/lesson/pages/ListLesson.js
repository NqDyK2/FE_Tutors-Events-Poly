import React, { useEffect } from 'react';
import './styles.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useDelLessonMutation,
  useGetAllLessonQuery,
} from '../../../app/api/lessonApiSlice';
import { Button, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FormLessonRef from '../components/FormLessonRef';
import { FaReply } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { timeFormat } from '../../../utils/TimeFormat';
import Spinner from '../../../components/Spinner';
import { PlusCircleOutlined } from '@ant-design/icons';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import ContentLessonModal from '../components/ContentLessonModal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    render: (text) => <strong>{text}</strong>,
    width: '5%',
  },
  {
    title: 'Thứ - Ngày/Tháng',
    dataIndex: 'ngay',
    key: 'ngay',
    width: '13%',
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian',
    key: 'thoigian',
    width: '10%',
  },
  {
    title: 'Môn học',
    dataIndex: 'subjects_name',
    key: 'subjects_name',
    width: '10%',
  },

  {
    title: 'Mã môn',
    dataIndex: 'subjects_code',
    key: 'subjects_code',
    width: '8%',
  },
  {
    title: 'Hình thức',
    dataIndex: 'hinhthuc',
    key: 'hinhthuc',
    width: '7%',
  },
  {
    title: 'Phòng học',
    dataIndex: 'phonghoc',
    key: 'phonghoc',
    width: '10%',
    render: (_, record) =>
      record.hinhthuc === 'Offline' ? (
        <span>{record.phonghoc}</span>
      ) : (
        <Tooltip color="#FF6D28" title={`${record.phonghoc}`}>
          <div className="tw-truncate tw-text-blue-500 dark:hover:tw-text-hoverLink">
            <a
              target="blank"
              href={record.phonghoc}
              className="hover:tw-text-hoverLink"
            >
              {record.phonghoc}
            </a>
          </div>
        </Tooltip>
      ),
  },
  {
    title: 'Giảng viên',
    dataIndex: 'teacher_email',
    key: 'teacher_email',
    width: '10%',
    render: (_, record) => (
      <Tooltip title={`${record.teacher_email}`} color="#FF6D28">
        <span>{record.teacher_email.split('@')[0]}</span>
      </Tooltip>
    ),
  },
  {
    title: 'Trợ giảng',
    dataIndex: 'tutor_email',
    key: 'tutor_email',
    width: '10%',
    _render: (_, record) =>
      record.tutor_email === null ? (
        <span>Trống</span>
      ) : (
        <Tooltip title={`${record.tutor_email}`} color="#FF6D28">
          <span>{record.tutor_email.split('@')[0]}</span>
        </Tooltip>
      ),
    // (
    //   <Tooltip title={`${record.tutor_email}`} color='#FF6D28'>
    //     <span>{record.tutor_email.split('@')[0]}</span>
    //   </Tooltip>
    // )
    get render() {
      return this._render;
    },
    set render(value) {
      this._render = value;
    },
  },
  {
    title: 'Nội dung',
    dataIndex: 'chitiet',
    key: 'chitiet',
    width: '8%',
    render: (_, record) => (
      <ContentLessonModal content={(record.chitiet ? record.chitiet : '')} />
    ),
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <div className={`${record.attended ? 'tw-hidden' : "tw-flex"}`}>
        <Tooltip title="Sửa buổi học" color="#FF6D28">
          <Button
            onClick={() => {
              record.action.modalRef.current.show('EDIT', record.action.item);
            }}
            className="tw-shadow-none tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink"
          >
            <EditOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Xóa buổi học" color="#FF6D28" placement="topLeft">
          <ConfirmPopup
            content={
              <Button className="tw-shadow-none tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink">
                <DeleteOutlined />
              </Button>
            }
            title={`Xác nhận xóa buổi học này?`}
            onConfirm={() => {
              record.action.handleRemoveLesson(record?.id);
            }}
            placement="topRight"
          />
        </Tooltip>
      </div>
    ),
  },
];

const ListLesson = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { id: subjectId } = useParams();

  const modalRef = React.useRef();

  let data = [];

  const [removeLesson, { isLoading: isRemove }] = useDelLessonMutation();

  const handleRemoveLesson = (id) => {
    removeLesson(id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const {
    data: response,
    error: lessonError,
    isLoading: lessonLoading,
  } = useGetAllLessonQuery(subjectId, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  }
  );

  const semesterStartTime = response?.tree[0].start_time;
  const semesterEndTime = response?.tree[0].end_time;
  const subjectName = response?.tree[1].name;

  if (response) {
    data = response.data.map((item, index) => {
      return {
        key: index,
        stt: index + 1,
        id: item.id,
        ngay: timeFormat(item.start_time.split('  ')[0]),
        hinhthuc: item.type ? 'Offline' : 'Online',
        thoigian: `${item.start_time.slice(10, -3)} - ${item.end_time.slice(
          10,
          -3,
        )}`,
        phonghoc: item.class_location,
        tutor_email: item.tutor_email,
        teacher_email: item.teacher_email,
        subjects_code: item.subjects_code?.toUpperCase(),
        subjects_name: item.subject_name,
        chitiet: item.content,
        attended: item.attended,
        action: { modalRef, item, handleRemoveLesson },
      };
    });
  }

  useEffect(() => {
    if (!response?.tree) return;
    dispatch(
      setFlexBreadcrumb([
        { title: 'Quản lý kỳ học', path: `/manage` },
        {
          title: response?.tree[0]?.name,
          path: `/manage/sem/${response?.tree[0]?.id}`,
        },
        { title: response?.tree[1]?.name + ' - Lịch học' },
      ]),
    );
  }, [dispatch, response]);

  return (
    <div>
      <Helmet>
        <title>Lịch dạy</title>
      </Helmet>
      <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
        <span className="tw-text-[15px] dark:tw-text-white">
          Lịch dạy lớp - {subjectName?.toUpperCase()}
        </span>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          <span>
            <Button
              type="link"
              icon={<PlusCircleOutlined />}
              onClick={() => modalRef.current.show('ADD', location.state)}
              className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100 dark:hover:tw-text-hoverLink"
            >
              Thêm buổi học
            </Button>
          </span>
          <button
            onClick={() => navigate(-1)}
            className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
          >
            <FaReply className="tw-mr-1" /> Trở lại
          </button>
        </div>
      </div>

      <div className="tw-mt-6">
        {lessonError && (
          <p className="tw-font-medium tw-text-red-500">
            {lessonError?.response?.data?.message ||
              lessonError?.data?.message ||
              'Đã có lỗi xảy ra!'}
          </p>
        )}

        <Table
          size="small"
          key={data.key}
          scroll={{ y: 380 }}
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={{
            indicator: <Spinner />,
            spinning: lessonLoading || isRemove,
          }}
        />
      </div>

      <FormLessonRef
        timeSemester={{ semesterStartTime, semesterEndTime }}
        ref={modalRef}
      />
    </div>
  );
};

export default ListLesson;
