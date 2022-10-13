import React from 'react';
import { Table } from 'antd';
import { Button } from 'antd';

import { Switch } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import {
  useGetAttendanceListStudentQuery,
  useUpdateAttendanceStudentStatusMutation,
} from '../../../../app/api/attendanceApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import Spinner from '../../../../components/Spinner';
const AttendanceStudent = () => {
  const location = useLocation();
  const { subjectCode } = location.state;
  const { classId } = useParams();
  const [studentsStatus, setStudentsStatus] = React.useState([]);
  const {
    data: listStudent,
    isLoading,
    error,
  } = useGetAttendanceListStudentQuery(classId);
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
      title: 'Mã sinh viên',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          key={record.student_code}
          className='tw-max-w-md tw-px-1 sm:tw-min-w-[50px] md:tw-min-w-[80px]'
          checkedChildren='Có mặt'
          unCheckedChildren='Vắng'
          defaultChecked={status}
          loading={isUpdateLoading}
          onChange={(value) => handleSwitch(value, record)}
        />
      ),
    },
    {
      title: 'Chú thích',
      dataIndex: 'note',
      responsive: ['md'],
      key: 'note',
      render: (_, record) => (
        <input
          key={record.student_code}
          type='text'
          className=' tw-max-h-[30px] tw-w-2/3 tw-rounded-[2px] tw-border tw-border-[#DEE2E6] tw-px-1'
        />
      ),
    },
  ];
  const data = listStudent?.map((item, index) => {
    return {
      stt: index + 1,
      id: item.id,
      student_code: item.user_code,
      student_name: item.user_name,
      status: item.status,
      note: '',
    };
  });

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
              rowKey='student_code'
              className='attendance-table'
              scroll={{ y: 500 }}
            />
            <textarea
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
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceStudent;
