import React from 'react';
import { Result, Table } from 'antd';
import { Button } from 'antd';

import { Switch } from 'antd';
import { useParams } from 'react-router-dom';
import {
  useGetAttendanceListStudentQuery,
  useUpdateAttendanceStudentStatusMutation,
} from '../../../../app/api/attendanceApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
const AttendanceStudent = () => {
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
    // {
    //     title: 'Tên lớp',
    //     dataIndex: 'tenlop',// VIẾT BỪA THÔI BAO GIỜ ĐỔ DỮ LIỆU NHỚ SỬA NHÁ CÁC BẠN IU
    //     key: 'tenlop',
    // },
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
    // {
    //     title: 'Ảnh',
    //     dataIndex: 'image',
    //     key: 'image',
    // },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Switch
          key={record.student_code}
          className='tw-max-w-md tw-px-1 sm:tw-min-w-[50px] md:tw-min-w-[80px]'
          checkedChildren='Có mặt'
          unCheckedChildren='Vắng'
          defaultChecked={record.status}
          onChange={(value) => handleSwitch(value, record)}
        />
      ),
    },
    {
      title: 'Chú thích',
      dataIndex: 'desc',
      responsive: ['md'],
      key: 'desc',
      render: (_, record) => (
        <input
          key={record.student_code}
          type='text'
          className=' tw-max-h-[30px] tw-px-1 tw-w-2/3 tw-border tw-border-[#DEE2E6] tw-rounded-[2px]'
        />
      ),
    },
  ];
  const data = listStudent?.data?.map((item, index) => {
    return {
      stt: index + 1,
      id: item.user_id,
      student_code: item.user.user_code,
      student_name: item.user.name,
      status: item.status,
      desc: '',
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
      listStudent?.data?.map((item, index) => {
        return {
          id: item.user.id,
          status: item.status,
        };
      })
    );
  }, [listStudent?.data]);
  return (
    <div className='tw-w-full'>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px] dark:tw-text-slate-100 '>Điểm danh</span>
      </div>
      <div className='tw-mt-6'>
        {error && <Result status={'error'} />}
        <Table
          loading={isLoading}
          pagination={false}
          columns={columns}
          dataSource={data}
          rowKey='student_code'
          className='attendance-table'
          
        />
        <textarea
          className='tw-border tw-rounded-[5px] tw-w-full tw-mt-[15px] tw-pt-[5px] '
          placeholder='Ghi chú về buổi tutors'
          name=''
          rows='3'
        />
        <Button
          type='primary'
          loading={isUpdateLoading}
          className='tw-w-full tw-h-[40px] tw-mt-[10px] tw-rounded-[5px] tw-bg-[#0DB27F]'
          onClick={() => handleUpdateStatus(studentsStatus, classId)}
        >
          Lưu điểm danh
        </Button>
      </div>
    </div>
  );
};

export default AttendanceStudent;
