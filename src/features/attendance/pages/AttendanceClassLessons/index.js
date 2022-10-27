import React from 'react';
import { Table, Tooltip } from 'antd';
import { Button } from 'antd';

import { Switch } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  useGetAttendanceClassLessonQuery,
  useUpdateAttendanceStudentStatusMutation,
} from '../../../../app/api/attendanceApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import Spinner from '../../../../components/Spinner';
import moment from 'moment';
const AttendanceClassLessons = () => {
  const location = useLocation();
  const { subjectCode } = location.state;
  const { classId } = useParams();
  const [studentsStatus, setStudentsStatus] = React.useState([]);
  const {
    data: listStudent,
    isLoading,
    error,
  } = useGetAttendanceClassLessonQuery(classId);
  const [
    updateStudentStatus,
    {
      isLoading: isUpdateLoading,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateAttendanceStudentStatusMutation();
  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Thời gian',
      dataIndex: 'lessonTime',
      key: 'lessonTime',
      width: '10%',
      // render: (text) => (
      //   // <p className='tw-text-center'>
      //   //   {text}
      //   // </p>
      // )
    },
    {
      title: 'Lớp học',
      dataIndex: 'classLocation',
      key: 'classLocation',
    },
    {
      title: 'Hình thức',
      dataIndex: 'lessonType',
      key: 'lessonType',
      render: (text) => {
        return text === 0 ? 'Online' : 'Offline';
      },
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
      render: (_, record) => (
        <Tooltip title={
          <div className=''>
            Nội dung: {record.content}
          </div>

        }
          placement="topLeft"
        >
          <div className='tw-cursor-pointer tw-text-sky-400 tw-font-medium'>
            Thông tin
          </div>
        </Tooltip>
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        renderAttendanceStatus(record)
      ),
    },

  ];
  const data = listStudent?.map((item, index) => {
    return {
      stt: index + 1,
      id: item.id,
      lessonTime: `${moment(item.start_time).format('DD/MM/YYYY')}
        ${moment(item.start_time).format('HH:mm')} - ${moment(
        item.end_time
      ).format('HH:mm')}`,
      startTime: item.start_time,
      endTime: item.end_time,
      subjectCode: item.subjects_code,
      classLocation: item.class_location,
      lessonType: item.type,
      attended: item.attended,
      attendanceStatus: `${item.attended_count}/${item.total_student}`,
      student_name: item.user_name,
      status: item.status,
      note: item.note,
      content: item.content,
    };
  });

  const renderAttendanceStatus = (record) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm');
    if (currentTime < record?.endTime && record?.attended === 0) {
      return (
        <Button className='tw-min-w-[150px] tw-rounded-[4px] tw-bg-[#0DB27F] hover:tw-bg-emerald-600 tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400'>
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
    }
    else if (currentTime < record?.endTime && record?.attended === 1) {
      return (
        <Button className='tw-min-w-[150px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400'>
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
    }
    else if (currentTime > record?.endTime) {
      return (
        <Button className='tw-min-w-[150px] tw-rounded-[4px] tw-bg-orange-300 hover:tw-bg-orange-400 tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400'>
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

    }
  };

  const handleSwitch = (value, record) => {
    const newStudentsStatus = studentsStatus.map((item) => {
      if (item.id === record.id) {
        return {
          ...item,
          status: value ? 1 : 0,
        };
      }
      return item;
    });
    setStudentsStatus(newStudentsStatus);
  };

  const handleUpdateStatus = async (studentsStatus, classId) => {
    await updateStudentStatus({
      data: {
        data: studentsStatus,
      },
      classId: parseInt(classId),
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Đã lưu điểm danh', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
    if (updateError) {
      toast.error('Đã có lỗi xảy ra');
    }
  }, [updateSuccess, updateError]);

  useEffect(() => {
    setStudentsStatus(
      listStudent?.map((item, index) => {
        return {
          id: item.id,
          status: item.status,
        };
      })
    );
  }, [listStudent]);

  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px] dark:tw-text-slate-100 '>
          Điểm danh
        </span>
      </div>
      {error && (
        <div className='tw-mt-6 tw-flex tw-h-full tw-items-center tw-justify-center'>
          <p className='tw-text-lg tw-text-red-500'>
            {error?.message || error?.data?.message || 'Đã có lỗi xảy ra'}
          </p>
        </div>
      )}
      {!error && (
        <>
          <h2 className='tw-mt-2'>Môn học: {subjectCode}</h2>
          <div className='tw-mt-6'>
            <Table
              loading={{
                indicator: <Spinner />,
                spinning: isLoading,
              }}
              pagination={false}
              columns={columns}
              dataSource={data}
              tableLayout='auto'
              rowKey='id'
              className='attendance-table'
              scroll={{ y: 500 }}
            />
            {/* <textarea
              className='tw-mt-[15px] tw-w-full tw-rounded-[5px] tw-border tw-pt-[5px] '
              placeholder='Ghi chú về buổi tutors'
              name=''
              rows='3'
            />
            <Button
              type='primary'
              loading={isUpdateLoading}
              disabled={listStudent?.data?.length === 0}
              className='tw-mt-[10px] tw-h-[40px] tw-w-full tw-rounded-[5px] tw-bg-[#0DB27F]'
              onClick={() => handleUpdateStatus(studentsStatus, classId)}
            >
              Lưu điểm danh
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceClassLessons;
