import { G2, Pie } from '@ant-design/charts';
import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetAllSemesterQuery,
  useGetCurrentSemesterStatsQuery,
  useGetSemesterStatsMutation,
} from '../../../app/api/semesterApiSlice';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import Spinner from '../../../components/Spinner';
import ListLessonModal from '../components/ListLessonModal';

const StatsPage = () => {
  const G = G2.getEngine('canvas');
  const [selectValue, setSelectValue] = useState(null);
  const [dataSourceChart, setDataSourceChart] = useState([]);
  const [dataSourceChart2, setDataSourceChart2] = useState([]);
  const [statData, setStatData] = React.useState([]);
  const lessonHistoryModalRef = React.useRef(null);
  const dispatch = useDispatch();
  const {
    data: semesterData,
    isLoading: isSemesterLoad,
    isError: isSemesterError,
  } = useGetAllSemesterQuery();
  const [getStatData, { isLoading, isError, data: statsData, isFetching }] =
    useGetSemesterStatsMutation();
  const {
    data: currentStatData,
    isLoading: currentLoading,
    isError: currentError,
  } = useGetCurrentSemesterStatsQuery({
    refetchOnFocus: true,
  });

  const config = {
    appendPadding: 10,
    data: dataSourceChart,
    angleField: 'value',
    colorField: 'type',
    animation: false,
    radius: 0.75,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}个 ${(data.percent * 100).toFixed()}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
  };
  const configChart2 = {
    appendPadding: 10,
    data: dataSourceChart2,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    // turn off animation
    animation: false,
    legend: false,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value}个 ${(data.percent * 100).toFixed()}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
  };

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        {
          title: 'Thống kê',
        },
      ]),
    );
  }, []);

  useEffect(() => {
    if (statsData) {
      setStatData(statsData?.data);

    }
  }, [statsData]);

  useEffect(() => {
    setDataSourceChart([
      {
        type: 'Qua môn',
        value: statData?.passed_joinned_students_count,
      },
      {
        type: 'Thi lại',
        value: statData?.not_passed_joinned_students_count,
      },
      {
        type: 'Cấm thi',
        value: statData?.banned_joinned_students_count,
      },
    ]);
  }, [statData]);

  useEffect(() => {
    setDataSourceChart2([
      {
        type: 'Qua môn',
        value: statData?.passed_students_count,
      },
      {
        type: 'Thi lại',
        value: statData?.not_passed_students_count,
      },
      {
        type: 'Cấm thi',
        value: statData?.banned_students_count,
      },
    ]);
  }, [statData]);

  useEffect(() => {
    if (currentStatData) {
      setStatData(currentStatData?.data);
      setSelectValue(currentStatData?.data?.id);
    }
  }, [currentStatData]);

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
            getStatData(value);
          }}
        >
          {semesterData?.map((semester) => (
            <Select.Option key={semester.id} value={semester.id}>
              {semester.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      {isLoading || isFetching || currentLoading ? (
        <div className="tw-flex tw-min-h-[30vh] tw-items-center tw-justify-center">
          <Spinner />
        </div>
      ) : isError || currentError ? (
        <div>Có lỗi xảy ra</div>
      ) : (
        <div className="tw-p-4">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-5">
            <div className="tw-w-full tw-border tw-border-gray-700 tw-py-4 lg:tw-w-1/6 dark:tw-border-gray-300">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Môn tutor</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.classrooms_statistical?.length ?? 0}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border tw-border-gray-700 tw-py-4 lg:tw-w-1/6 dark:tw-border-gray-300">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Tổng sinh viên</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.total_students_count ?? 0}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border tw-border-gray-700 tw-py-4 lg:tw-w-1/6 dark:tw-border-gray-300">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Sinh viên tham gia</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.joined_students_count ?? 0}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border tw-border-gray-700 tw-py-4 lg:tw-w-1/6 dark:tw-border-gray-300">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Giảng viên</h1>
                <h2 className="tw-text-lg dark:tw-text-white">{statData?.teachers?.length ?? 0}</h2>
              </div>
            </div>
            <div className="tw-w-full tw-border tw-border-gray-700 tw-py-4 lg:tw-w-1/6 dark:tw-border-gray-300">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Trợ giảng</h1>
                <h2 className="tw-text-lg dark:tw-text-white">{statData?.tutors?.length ?? 0}</h2>
              </div>
            </div>
          </div>
          <div className="tw-flex lg:tw-flex-row tw-flex-col tw-py-6">
            <div className="lg:tw-w-1/2 tw-w-full">
              <Pie {...configChart2} />
              <p className="tw-text-center dark:tw-text-white">
                Thống kê theo tổng {statData?.total_students_count} sinh viên
                của {statData?.classrooms_statistical?.length} môn
              </p>
            </div>
            <div className="lg:tw-w-1/2 tw-w-full">
              <Pie
                loading={isLoading || isFetching || currentLoading}
                {...config}
              />

              <p className="tw-text-center dark:tw-text-white">
                Thống kê theo {statData?.joined_students_count} sinh viên tham gia
              </p>
            </div>
          </div>
          <div>
            <Table
              pagination={false}
              columns={[
                {
                  title: 'Môn',
                  dataIndex: 'subject',
                  key: 'subject',
                  render: (text, record) => {
                    return <div className="tw-text-blue-600 tw-cursor-pointer"
                      onClick={() => lessonHistoryModalRef.current?.show(
                        {
                          data: statData?.classrooms_statistical?.find(
                            (item) => item.id === record.id
                          )?.lessons,
                          subject: text,
                        }

                      )}
                    >{text}</div>
                  },
                },
                {
                  title: 'Buổi học',
                  dataIndex: 'lesson',
                  key: 'lesson',
                },
                {
                  title: 'Giảng viên phụ trách',
                  dataIndex: 'teacher',
                  key: 'teacher',
                },
                {
                  title: 'Tổng sinh viên',
                  dataIndex: 'total',
                  key: 'total',
                },
                {
                  title: 'Tham gia',
                  dataIndex: 'join',
                  key: 'join',
                },
                {
                  title: 'Tỉ lệ sv qua môn',
                  dataIndex: 'pass',
                  key: 'pass',
                  render: (text) => <span dangerouslySetInnerHTML={{ __html: text }}></span>,
                },
                {
                  title: 'Tỉ lệ sv tham gia qua môn',
                  dataIndex: 'passJoin',
                  key: 'passJoin',
                  render: (text) => <span dangerouslySetInnerHTML={{ __html: text }}></span>,
                },
              ]}
              rowClassName="tw-font-semibold"
              dataSource={statData?.classrooms_statistical?.map(
                (item, idx) => ({
                  key: idx,
                  id: item?.id,
                  subject: item?.subject?.code,
                  total: item?.total_students_count,
                  join: item?.joined_students.length,
                  lesson: item?.lessons.length,
                  teacher: item?.default_teacher_email.split('@')[0],
                  pass:
                    `${item?.passed_students_count}/${item?.total_students_count}&emsp;(
                    ${item?.total_students_count > 0
                      ? (
                        item?.passed_students_count /
                        item?.total_students_count
                      ).toFixed(2) * 100
                      : 0
                    }%)
                    `,
                  passJoin:
                    `${item?.passed_joinned_students_count}/${item?.joined_students.length}&emsp;(
                    ${item?.joined_students.length > 0
                      ? (
                        item?.passed_joinned_students_count /
                        item?.joined_students.length
                      ).toFixed(2) * 100
                      : 0
                    }%)
                    `,
                }),
              )}
            />
            <ListLessonModal ref={lessonHistoryModalRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
