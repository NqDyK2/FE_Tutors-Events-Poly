import React from 'react';
import './styles.css';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import { PlusOutlined } from '@ant-design/icons';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    render: (text) => <strong>{text}</strong>,
    width: '5%',
  },
  {
    title: 'Ngày',
    dataIndex: 'ngay',
    key: 'ngay',
    width: '10%',
  },
  {
    title: 'Hình thức',
    dataIndex: 'hinhthuc',
    key: 'hinhthuc',
    width: '8%',
  },
  {
    title: 'Mã môn',
    dataIndex: 'subjects_code',
    key: 'subjects_code',
    width: '5%',
  },
  {
    title: 'Môn',
    dataIndex: 'subjects_name',
    key: 'subjects_name',
    width: '10%',
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian',
    key: 'thoigian',
    width: '10%',
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
        <a target="blank" href={record.phonghoc}>
          {record.phonghoc}
        </a>
      ),
  },
  {
    title: 'Giảng viên',
    dataIndex: 'teacher_email',
    key: 'teacher_email',
    width: '5%',
  },
  {
    title: 'Trợ giảng',
    dataIndex: 'tutor_email',
    key: 'tutor_email',
    width: '5%',
  },
  {
    title: 'Nội dung',
    dataIndex: 'chitiet',
    key: 'chitiet',
    render: (_, record) => (
      <Tooltip placement="left" title={record.chitiet} color={'green'}>
        <span className="tw-cursor-pointer tw-text-blue-500">Nội dung</span>
      </Tooltip>
    ),
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <div className="tw-flex">
        <Button
          onClick={() => {
            record.action.modalRef.current.show('EDIT', record.action.item);
          }}
          className="dark:tw-text-white tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent"
        >
          <EditOutlined />
        </Button>
        <ConfirmPopup
          content={
            <Button className="dark:tw-text-white tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent">
              <DeleteOutlined />
            </Button>
          }
          title={`Xác nhận xóa buổi học này?`}
          onConfirm={() => {
            record.action.handleRemoveLesson(record?.id);
          }}
          placement="topRight"
        />
      </div>
    ),
  },
];

const ListLesson = () => {
  const location = useLocation();

  const { id: subjectId } = useParams();

  const { semesterId, subjectName, semesterStartTime, semesterEndTime } =
    location.state || {};

  const modalRef = React.useRef();

  let data = [];

  const [removeLesson, { isLoading: isRemove }] = useDelLessonMutation();

  const handleRemoveLesson = (id) => {
    removeLesson(id)
      .unwrap()
      .then((_) => {
        toast.success('Xóa buổi học thành công.');
      })
      .catch(() => {
        toast.error(`Xóa không thành công.`);
      });
  };

  const {
    data: lessonList,
    error: lessonError,
    isLoading: lessonLoading,
  } = useGetAllLessonQuery(subjectId);

  if (lessonList) {
    data = lessonList.map((item, index) => {
      return {
        key: index,
        stt: index + 1,
        id: item.id,
        ngay: timeFormat(item.start_time.split(' ')[0]),
        hinhthuc: item.type ? 'Offline' : 'Online',
        thoigian: `${item.start_time.split(' ')[1]} - ${item.end_time.split(' ')[1]
          }`,
        phonghoc: item.class_location,
        tutor_email: item.tutor_email.split('@')[0],
        teacher_email: item.teacher_email.split('@')[0],
        subjects_code: item.subjects_code?.toUpperCase(),
        subjects_name: item.subject_name,
        chitiet: item.content,
        action: { modalRef, item, handleRemoveLesson },
      };
    });
  }

  return (
    <div>
      <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
        <span className="tw-text-[15px] dark:tw-text-white">
          Lịch học - {subjectName?.toUpperCase()}
        </span>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          <span>
            <Button
              type="primary"
              onClick={() => modalRef.current.show('ADD', location.state)}
              className="tw-flex tw-items-center tw-justify-center tw-border-0 tw-bg-green-400 tw-px-2 tw-shadow-sm tw-shadow-green-400 hover:tw-bg-green-500 hover:tw-text-white dark:tw-bg-transparent dark:tw-shadow-none dark:hover:tw-text-green-400"
            >
              <PlusOutlined className="-tw-mr-1" /> Thêm buổi học
            </Button>
          </span>
          <Link
            to={`/manage/sem/${semesterId}`}
            className="tw-flex tw-items-center hover:tw-text-blue-600"
          >
            <FaReply className="tw-mr-1" /> Trở lại
          </Link>
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
          key={data.key}
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
