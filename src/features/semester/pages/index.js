import { List, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllSemesterQuery } from '../../../app/api/semesterApiSlice';

const SemesterPage = () => {
  const { data, error, isLoading } = useGetAllSemesterQuery();
  console.log(data);
  return (
    <>
    {error && <Typography.Text type='danger'>{error.message}</Typography.Text>}
      <List
        header={<div>Semesters</div>}
        dataSource={data?.semester?.data}
        bordered
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/sem/${item.id}`}> {item.name} </Link>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default SemesterPage;
