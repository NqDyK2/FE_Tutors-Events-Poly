import { G2, Pie } from '@ant-design/charts';
import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';

const StatsPage = () => {
  const G = G2.getEngine('canvas');

  const dispatch = useDispatch();
  const {
    data: semesterData,
    isLoading: isSemesterLoad,
    isError: isSemesterError,
  } = useGetAllSemesterQuery();
  const [selectValue, setSelectValue] = useState(null);

  const data = [
    {
      type: 'Cấm thi',
      value: 50,
    },
    {
      type: 'Thi lại',
      value: 25,
    },
    {
      type: 'Qua môn',
      value: 180,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
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

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        {
          title: 'Thống kê',
        },
      ]),
    );
  });

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
            // getHistoryData(value);
          }}
        >
          {semesterData?.map((semester) => (
            <Select.Option key={semester.id} value={semester.id}>
              {semester.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="tw-p-4">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4">
          <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/6">
            <div className="tw-flex tw-flex-col tw-items-center">
              <h1>Lớp tutor</h1>
              <h2 className="tw-text-lg">20</h2>
            </div>
          </div>
          <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/6">
            <div className="tw-flex tw-flex-col tw-items-center">
              <h1>Sinh viên tham gia</h1>
              <h2 className="tw-text-lg">120</h2>
            </div>
          </div>
          <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/5">
            <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center">
              <h1>Sv tham gia qua môn</h1>
              <h2 className="tw-text-lg">
                <small>50%</small> 60
              </h2>
            </div>
          </div>
          <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/6">
            <div className="tw-flex tw-flex-col tw-items-center">
              <h1>Giảng viên</h1>
              <h2 className="tw-text-lg">10</h2>
            </div>
          </div>
          <div className="tw-w-full tw-border-2 tw-border-gray-700 tw-py-4 lg:tw-w-1/6">
            <div className="tw-flex tw-flex-col tw-items-center">
              <h1>Trợ giảng</h1>
              <h2 className="tw-text-lg">10</h2>
            </div>
          </div>
        </div>
        <div className="tw-flex tw-py-6">
          <div className="tw-w-1/2">
            <Pie {...config} />

            <p className="tw-text-center">
              Thống kê theo 320 sinh viên tham gia
            </p>
          </div>
          <div className="tw-w-1/2">
            <Pie {...config} />
            <p className="tw-text-center">
              Thống kê theo 320 sinh viên tham gia
            </p>
          </div>
        </div>
        <div>
          <Table
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
              },
              {
                title: 'Tỉ lệ sv tham gia qua môn',
                dataIndex: 'passJoin',
                key: 'passJoin',
              },
            ]}
            dataSource={[
              {
                key: '1',
                subject: 'Toán',
                total: 320,
                join: 120,
                lesson: 20,
                pass: '50%',
                passJoin: '50%',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
