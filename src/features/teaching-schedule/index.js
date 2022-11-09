import { Table, Tooltip } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetScheduleTeachingQuery } from '../../app/api/studentApiSlice';
import { timeFormat } from '../../utils/TimeFormat';

const TeachingSchedule = () => {
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
      dataIndex: 'day',
      key: 'day',
      width: '12%',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
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
      dataIndex: 'type',
      key: 'type',
      width: '7%',
    },
    {
      title: 'Phòng học',
      dataIndex: 'class_location',
      key: 'class_location',
      width: '15%',
      render: (_, record) =>
        record.type === 'Offline' ? (
          <span> {record.class_location}</span>
        ) : (
          <Tooltip color="#FF6D28" title={`${record.class_location}`}>
            <div className="tw-truncate">
              <a target="blank" href={record.class_location}>
                {record.class_location}
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
      get render() {
        return this._render;
      },
      set render(value) {
        this._render = value;
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (_, record) => (
        <Tooltip title={record.content} color="#FF6D28" trigger={'click'}>
          <span className="tw-cursor-pointer tw-text-blue-500">Nội dung</span>
        </Tooltip>
      ),
    },
  ];
  let data = [];

  const { data: listSchedule } = useGetScheduleTeachingQuery();

  if (listSchedule) {
    data = listSchedule.data.map((item, index) => {
      return {
        key: index,
        stt: index + 1,
        id: item.id,
        day: timeFormat(item.start_time.split('  ')[0]),
        type: item.type === 1 ? 'Offline' : 'Online',
        time: `${item.start_time.slice(10, -3)} - ${item.end_time.slice(
          10,
          -3,
        )}`,
        class_location: item.class_location,
        tutor_email: item.tutor_email,
        teacher_email: item.teacher_email,
        subjects_code: item.subject_code?.toUpperCase(),
        subjects_name: item.subject_name,
        content: item.content,
      };
    });
  }

  return (
    <>
      <Helmet>
        <title>Lịch dạy</title>
      </Helmet>
      <div className="tw-border-b-2 tw-pb-1">
        <span className="tw-text-[15px] dark:tw-text-white ">Lịch dạy</span>
      </div>

      <Table
        size="small"
        key={data.key}
        scroll={{ x: 380 }}
        columns={columns}
        dataSource={data}
        className="tw-mt-2"
        pagination={false}
      />
    </>
  );
};

export default TeachingSchedule;
