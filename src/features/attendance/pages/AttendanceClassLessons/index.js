import React from 'react';
import { Table, Tooltip } from 'antd';
import { Button } from 'antd';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAttendanceClassLessonQuery } from '../../../../app/api/attendanceApiSlice';
import './styles.css';
import Spinner from '../../../../components/Spinner';
import moment from 'moment';
import { timeFormat } from '../../../../utils/TimeFormat';
import { Helmet } from 'react-helmet-async';
import { FaReply } from 'react-icons/fa';
import ContentLessonModal from '../../../lesson/components/ContentLessonModal';
const AttendanceClassLessons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectCode } = location.state;
  const { classId } = useParams();
  const {
    data: listStudent,
    isLoading,
    error,
  } = useGetAttendanceClassLessonQuery(classId);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: '7%',
    },
    {
      title: 'Thứ - Ngày/Tháng',
      dataIndex: 'day',
      key: 'day',
      width: '15%',
    },
    {
      title: 'Thời gian',
      dataIndex: 'lessonTime',
      key: 'lessonTime',
      width: '15%',
      render: (text) => {
        return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
      },
    },
    {
      title: 'Hình thức',
      dataIndex: 'lessonType',
      key: 'lessonType',
      width: '10%',
    },
    {
      title: 'Phòng học',
      dataIndex: 'classLocation',
      key: 'classLocation',
      width: '20%',
      render: (_, record) =>
        record.lessonType === 'Offline' ? (
          <span>{record.classLocation}</span>
        ) : (
          <div>
            <a target="blank" href={record.classLocation} className='hover:tw-text-hoverLink'>
              {record.classLocation}
            </a>
          </div>
        ),
    },
    {
      title: 'Điểm danh',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'content',
      key: 'content',
      width: '10%',
      render: (_, record) => (
        <ContentLessonModal content={record?.content} />
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => renderAttendanceStatus(record),
    },
  ];
  const data = listStudent?.map((item, index) => {
    return {
      stt: index + 1,
      id: item.id,
      day: timeFormat(item.start_time.split('  ')[0]),
      lessonTime: `${item.start_time.slice(10, -3)} - ${item.end_time.slice(
        10,
        -3,
      )}`,
      startTime: item.start_time,
      endTime: item.end_time,
      subjectCode: item.subjects_code,
      classLocation: item.class_location,
      lessonType: item.type ? 'Offline' : 'Online',
      attended: item.attended,
      // `${item.attended_count}/${item.total_student}`
      attendanceStatus: item.attended_count === 0 ? (<span className='tw-font-semibold tw-text-red-500'>Chưa điểm danh</span>) : `${item.attended_count}/${item.total_student}`,
      student_name: item.user_name,
      status: item.status,
      note: item.note,
      content: item.content,
      tutorEmail: item.tutor_email,
    };
  });

  const renderAttendanceStatus = (record) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm');
    if (
      currentTime > record?.startTime &&
      currentTime < record?.endTime &&
      record?.attended === 0
    ) {
      return (
        <Button className=" tw-min-w-[150px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white hover:tw-border-transparent dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400">
          <Link
            to={`/diem-danh/buoi-hoc/${record.id}`}
            state={{
              subjectCode: record.subjectCode,
            }}
          >
            Điểm danh
          </Link>
        </Button>
      );
    } else if (
      currentTime > record?.startTime &&
      currentTime < record?.endTime &&
      record?.attended === 1
    ) {
      return (
        <Button className="tw-min-w-[150px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white hover:tw-border-transparent dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400">
          <Link
            to={`/diem-danh/buoi-hoc/${record.id}`}
            state={{
              subjectCode: record.subjectCode,
            }}
          >
            Chỉnh sửa
          </Link>
        </Button>
      );
    } else if (currentTime > record?.endTime) {
      return (
        <Button className="tw-min-w-[150px] tw-rounded-[4px] tw-bg-blue-500 tw-text-white  hover:tw-border-transparent dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400">
          <Link
            to={`/diem-danh/buoi-hoc/${record.id}`}
            state={{
              subjectCode: record.subjectCode,
            }}
          >
            Xem điểm danh
          </Link>
        </Button>
      );
    } else if (currentTime < record?.startTime) {
      return (
        <Button
          disabled
          className="tw-min-w-[150px] tw-rounded-[4px] tw-bg-orange-300 tw-text-white hover:tw-border-transparent	hover:tw-bg-orange-400 dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400"
        >
          Chưa đến giờ
        </Button>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Điểm danh</title>
      </Helmet>
      <div className="tw-w-full">
        <div className="tw-flex tw-justify-between tw-border-b-2 ">
          <span className="tw-text-[15px] dark:tw-text-slate-100 ">
            Điểm danh
          </span>
          <div className="tw-pb-1">
            <button
              onClick={() => navigate(-1)}
              className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
            >
              <FaReply className="tw-mr-1" /> Trở lại
            </button>
          </div>
        </div>
        {error && (
          <div className="tw-mt-6 tw-flex tw-h-full tw-items-center tw-justify-center">
            <p className="tw-text-lg tw-text-red-500">
              {error?.message || error?.data?.message || 'Đã có lỗi xảy ra'}
            </p>
          </div>
        )}
        {!error && (
          <>
            <h2 className="tw-mt-2 dark:tw-text-white">
              Môn học: {subjectCode}
            </h2>
            <div className="tw-mt-6">
              <Table
                loading={{
                  indicator: <Spinner />,
                  spinning: isLoading,
                }}
                pagination={false}
                columns={columns}
                dataSource={data}
                tableLayout="auto"
                rowKey="id"
                className="attendance-table"
                scroll={{ x: 500 }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AttendanceClassLessons;
