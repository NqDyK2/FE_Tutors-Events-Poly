import { Select, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllSemesterQuery } from '../../../../app/api/semesterApiSlice';
import {
  useGetAllMissingClassQuery,
  useGetStudentCurrentHistoryLessonQuery,
  useGetStudentHistoryLessonBySemesterMutation,
} from '../../../../app/api/studentApiSlice';
import Spinner from '../../../../components/Spinner';
import ContentLessonModal from '../../../lesson/components/ContentLessonModal';
import { setFlexBreadcrumb } from '../../../../components/AppBreadcrumb/breadcrumbSlice';

const StudentLessonHistoryPage = () => {
  const {
    data: semesterData,
    isLoading: isSemesterLoad,
    isError: isSemesterError,
  } = useGetAllSemesterQuery();
  const dispatch = useDispatch();
  const [getHistoryData, { isLoading, isError, data }] =
    useGetStudentHistoryLessonBySemesterMutation();
  const { data: listClassMisses, isLoading: listclassPending } =
    useGetAllMissingClassQuery();
  const [classMissed, setClassMissed] = React.useState([]);
  const [historyData, setHistoryData] = React.useState([]);
  const {
    data: currentHistoryData,
    isLoading: currentLoading,
    isError: currentError,
  } = useGetStudentCurrentHistoryLessonQuery();
  const [selectValue, setSelectValue] = React.useState(null);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Trợ giảng',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Điểm danh',
      dataIndex: 'attendanceStatus',
      key: 'attendanceStatus',
      render: (text) => {
        if (text === 'Có mặt') {
          return <span className="tw-text-green-500">{text}</span>;
        } else if (text === 'Chưa học') {
          return <span className="">{text}</span>;
        } else {
          return <span className="tw-text-red-500">{text}</span>;
        }
      },
    },
    {
      title: 'Nội dung buổi học',
      dataIndex: 'lessonContent',
      key: 'lessonContent',
      render: (text) => {
        return <ContentLessonModal content={text} />;
      },
    },
  ];

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        {
          title: 'Lịch sử học',
        },
      ]),
    );
  });

  useEffect(() => {
    if (listClassMisses) {
      setClassMissed(listClassMisses?.data.reduce((a, b) => { return [...a, b.code] }, []));
    }
  }, [listClassMisses]);

  useEffect(() => {
    if (data) {
      setHistoryData(data);
    }
  }, [data]);

  useEffect(() => {
    if (currentHistoryData) {
      setHistoryData(currentHistoryData);
      setSelectValue(currentHistoryData?.semester?.id);
    }
  }, [currentHistoryData]);

  return (
    <div>
      <div className="tw-flex tw-flex-col tw-items-start dark:tw-text-white">
        <span>Học kỳ</span>
        <Select
          placeholder="Chọn học kỳ"
          className="lesson_history tw-w-full dark:tw-bg-[#1b1c1f] dark:tw-text-white"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          loading={isSemesterLoad}
          value={selectValue}
          onChange={(value) => {
            setSelectValue(value);
            getHistoryData(value);
          }}
        >
          {semesterData?.map((semester) => (
            <Select.Option key={semester.id} value={semester.id}>
              {semester.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="tw-mt-4">
        {isLoading || currentLoading ? (
          <div className="tw-flex tw-min-h-[30vh] tw-items-center tw-justify-center">
            <Spinner />
          </div>
        ) : isError || currentError ? (
          <div>Có lỗi xảy ra</div>
        ) : (
          <>
            {historyData?.data?.length > 0 ? (
              historyData?.data.map((item, idx) => {
                if (!classMissed.some(x => x === item?.subject_code)) {
                  return (
                    <div
                      key={idx}
                      className="tw-mb-8 tw-border tw-shadow-md tw-drop-shadow-sm "
                    >
                      <Table
                        title={() => (
                          <span className="tw-font-semibold">
                            {item?.subject_name} - {item?.subject_code}
                          </span>
                        )}
                        columns={columns}
                        dataSource={item?.lessons?.map((lesson, index) => ({
                          key: index,
                          stt: index + 1,
                          date:
                            moment(lesson?.start_time).format('DD/MM/YYYY') +
                            ' - ' +
                            moment(lesson?.start_time).format('HH:mm') +
                            ' - ' +
                            moment(lesson?.end_time).format('HH:mm'),
                          teacher: lesson?.teacher_email?.split('@')[0] ?? '',
                          tutor: lesson.tutor_email?.split('@')[0] ?? '',
                          attendanceStatus:
                            lesson?.attendances_count === 1 ? 'Có mặt' : (moment().isBefore(lesson?.start_time) ? 'Chưa học' : 'Vắng mặt'),
                          lessonContent: lesson.content ?? '',
                        }))}
                        pagination={false}
                        scroll={{ x: 400 }}
                      />
                    </div>
                  )
                }
                return "";
              })
            ) : (
              <div className="tw-flex tw-min-h-[150px] tw-items-center tw-justify-center tw-text-center">
                Không có dữ liệu
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentLessonHistoryPage;
