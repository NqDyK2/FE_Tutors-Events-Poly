import React, { useEffect, useState } from 'react';
import { Table, Form, Button, List } from 'antd';
import { toast } from 'react-toastify';

import {
  useCheckInTutorMutation,
  useGetAllMissingClassQuery,
  useGetScheduleQuery,
  useJoinClassMutation,
} from '../../../../app/api/studentApiSlice';
import { timeFormat } from '../../../../utils/TimeFormat';
import Spinner from '../../../../components/Spinner';
import ContentLessonModal from '../../../lesson/components/ContentLessonModal';
import { setFlexBreadcrumb } from '../../../../components/AppBreadcrumb/breadcrumbSlice';
import { useDispatch } from 'react-redux';
import FeedBack from '../../components/FeedBack';
import moment from 'moment';

const TimeTable = () => {
  const dispatch = useDispatch();
  const [joinClass] = useJoinClassMutation();
  const [joinClassLoading, setJoinClassLoading] = useState(null);
  const [skip, setSkip] = useState(false)
  const [checkInLoading, setCheckInLoading] = useState(null)
  const { data: listClassMisses, isLoading: listclassPending } =
    useGetAllMissingClassQuery();
  const { data: listSchedule, isLoading: listSchedulePending } =
    useGetScheduleQuery({ skip });
  const [checkInTutor] = useCheckInTutorMutation()

  const handleCheckInTutor = (id) => {
    setCheckInLoading(id)
    checkInTutor(id)
      .unwrap()
      .then((res) => {
        setCheckInLoading(null)
        toast.success(res.message);
        setSkip(new Date().getTime())
      })
      .catch((err) => {
        setCheckInLoading(null)
        toast.error(err.data.message);
      });
  }
  // table antd
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
    },
    {
      title: 'Hình thức',
      dataIndex: 'hinhthuc',
      key: 'hinhthuc',
    },
    {
      title: 'Mã môn',
      dataIndex: 'subjects_code',
      key: 'subjects_code',
    },
    {
      title: 'Môn',
      dataIndex: 'subjects_name',
      key: 'subjects_name',
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoigian',
      key: 'thoigian',
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
          <a
            target="blank"
            href={record.phonghoc}
            className="hover:tw-text-hoverLink"
          >
            {record.phonghoc}
          </a>
        ),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher_email',
      key: 'teacher_email',
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
        <ContentLessonModal content={record.chitiet ? record.chitiet : ''} />
      ),
    },
    {
      title: '',
      dataIndex: 'checkin',
      key: 'checkin',
      render: (_, record) => (
        <>
          {(moment(record.startTime) <= moment() && moment(record.endTime) >= moment()) ? (
            <>
              {!record.isCheckedIn ? (
                <Button
                  loading={checkInLoading === record.id}
                  onClick={() => handleCheckInTutor(record.id)}
                  className="tw-border-transparent hover:tw-bg-green-700 tw-w-[100px] tw-rounded-[4px] tw-bg-[#0DB27F] tw-text-white dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400"
                >
                  Điểm danh
                </Button >
              ) : (
                <p className='tw-p-0 tw-m-0'>Đã diểm danh</p>
              )}
            </>
          ) : ("")}
        </>
      )
    },
    {
      title: '',
      dataIndex: 'checkin',
      key: 'checkin',
      render: (_, record) => {
        console.log("start Time: ", moment(record.startTime) < moment());
        console.log("end time: ", moment(record.endTime) > moment());
      }
    }
  ];

  const dataClass = listClassMisses?.data.map((item, index) => ({
    key: index,
    id: item.id,
    subject_name: item.name,
    subject_code: item.code,
  }));
  const dataTable = listSchedule?.data.map((item, index) => ({
    key: index,
    id: item.id,
    stt: index + 1,
    ngay: timeFormat(item.start_time.split(' ')[0]),
    hinhthuc: item.type ? 'Offline' : 'Online',
    thoigian: `${item.start_time?.split(' ')[1]} - ${item.end_time?.split(' ')[1]
      }`,
    phonghoc: item.class_location,
    tutor_email: item.tutor_email?.split('@')[0],
    teacher_email: item.teacher_email.split('@')[0],
    subjects_code: item.subject_code?.toUpperCase(),
    subjects_name: item.subject_name,
    chitiet: item.content,
    startTime: item.start_time,
    endTime: item.end_time,
    isCheckedIn: item.is_checked_in,
  }));

  const needFeedback = listSchedule?.need_feedback.map((item, index) => ({
    key: index,
    subjectName: item.subject.name,
    subjectCode: item.subject.code,
    id: item.id,
  }))

  const handleJoinClass = (id) => {
    setJoinClassLoading(id);
    joinClass(id)
      .unwrap()
      .then((res) => {
        setSkip(listClassMisses?.data.length)
        setJoinClassLoading(null);
        toast.success(res.message);
      })
      .catch((err) => {
        setJoinClassLoading(null);
        toast.error(err.data.message);
      });
  };

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        {
          title: 'Lịch học',
        },
      ]),
    );
  });

  if (listclassPending || listSchedulePending) {
    return (
      <div className="tw-mt-[110px] tw-flex tw-justify-center">
        <Spinner
          tip={
            <p className="tw-mt-5 tw-text-orange-300 dark:tw-text-white">
              Loading
            </p>
          }
        />
      </div>
    );
  }

  if (listClassMisses?.data.length) {
    return (
      <div>
        <h2 className="tw-mb-4 tw-text-center tw-text-lg dark:tw-text-white">
          Bạn có {dataClass?.length} môn học cần tham gia tutor.
        </h2>
        <List
          dataSource={dataClass}
          renderItem={(item, index) => (
            <List.Item key={item.key}>
              <List.Item.Meta
                title={
                  <p className="tw-mb-0 dark:tw-text-white">
                    {item.subject_code}
                  </p>
                }
                description={
                  <p className="tw-text-[#555] dark:tw-text-gray-300">
                    {item.subject_name}
                  </p>
                }
              />
              <div>
                <Button
                  loading={joinClassLoading === item.id}
                  onClick={() => handleJoinClass(item.id)}
                  type="primary"
                  className="tw-rounded tw-border-0 tw-bg-[#04b0a6] hover:tw-bg-[#01988f]"
                >
                  Tham gia
                </Button>
              </div>
            </List.Item>
          )}
        />
        <p className="tw-text-center tw-text-[#777]">
          Vui lòng tham gia tất cả để theo dõi lịch học.
        </p>
      </div>
    )
  }

  if (needFeedback?.length) {
    return (
      <div>
        <h2 className="tw-mb-4 tw-text-center tw-text-lg dark:tw-text-white">
          Bạn có {needFeedback.length} môn học cần đánh giá.
        </h2>
        <List
          dataSource={needFeedback}
          renderItem={(item, index) => (
            <List.Item key={item.key}>
              <List.Item.Meta
                title={
                  <p className="tw-mb-0 dark:tw-text-white">
                    {item.subjectCode}
                  </p>
                }
                description={
                  <p className="tw-text-[#555] dark:tw-text-gray-300">
                    {item.subjectName}
                  </p>
                }
              />
              <div>
                <FeedBack setSkip={setSkip} id={item.id} />
              </div>
            </List.Item>
          )}
        />
        <p className="tw-text-center tw-text-[#777]">
          Vui lòng đánh giá tất cả để theo dõi lịch học.
        </p>
      </div>

    )
  }

  return (
    <Table
      key={dataTable?.key}
      columns={columns}
      dataSource={dataTable}
      pagination={false}
      scroll={{
        x: 380,
      }}
      loading={{
        indicator: <Spinner />,
        spinning: listSchedulePending,
      }}
    />
  );
};

export default TimeTable;
