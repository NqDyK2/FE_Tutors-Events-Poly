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

const StatsPage = () => {
  const G = G2.getEngine('canvas');
  const [selectValue, setSelectValue] = useState(null);
  const [dataSourceChart2, setDataSourceChart2] = useState([]);
  const [statData, setStatData] = React.useState([]);
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
    data: [
      {
        type: 'Qua môn',
        value: 27,
      },
      {
        type: 'Thi lại',
        value: 25,
      },
      {
        type: 'Cấm thi',
        value: 18,
      },
    ],
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
    }
  }, [statsData]);

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
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 ">
            <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/5 ">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Lớp tutor</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.classrooms_statistical?.length}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/5">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white dark:tw-text-white'>Sinh viên tham gia</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.joined_students_count}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/4">
              <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white '>Sv tham gia qua môn</h1>
                <h2 className="tw-text-lg dark:tw-text-white">
                  {statData?.passed_joinned_students_count}
                </h2>
              </div>
            </div>
            <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/5">
              <div className="tw-flex tw-flex-col tw-items-center">
                <h1 className='dark:tw-text-white'>Giảng viên</h1>
                <h2 className="tw-text-lg dark:tw-text-white">{statData?.teachers_count}</h2>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-py-6">
            <div className="tw-w-1/2">
              <Pie
                loading={isLoading || isFetching || currentLoading}
                {...config}
              />

              <p className="tw-text-center dark:tw-text-white">
                Thống kê theo {statData?.total_students_count} sinh viên tham
                gia
              </p>
            </div>
            <div className="tw-w-1/2">
              <Pie {...configChart2} />
              <p className="tw-text-center dark:tw-text-white">
                Thống kê theo tổng {statData?.total_students_count} sinh viên
                của {statData?.classrooms_statistical?.length} môn
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
                  title: 'Buổi học',
                  dataIndex: 'lesson',
                  key: 'lesson',
                },
                {
                  title: 'Tỉ lệ sv qua môn',
                  dataIndex: 'pass',
                  key: 'pass',
                  render: (text) => <span>{text}%</span>,
                },
                {
                  title: 'Tỉ lệ sv tham gia qua môn',
                  dataIndex: 'passJoin',
                  key: 'passJoin',
                  render: (text) => <span>{text}%</span>,
                },
              ]}
              rowClassName="tw-font-semibold"
              dataSource={statData?.classrooms_statistical?.map(
                (item, idx) => ({
                  key: idx,
                  subject: item?.id,
                  total: item?.total_students_count,
                  join: item?.joined_students_count,
                  lesson: item?.lessons.length,
                  pass:
                    item?.passed_students_count > 0
                      ? (
                        item?.passed_students_count /
                        item?.total_students_count
                      ).toFixed(2) * 100
                      : 0,
                  passJoin:
                    item?.passed_joinned_students_count > 0
                      ? (
                        item?.passed_joinned_students_count /
                        item?.joined_students_count
                      ).toFixed(2) * 100
                      : 0,
                }),
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
