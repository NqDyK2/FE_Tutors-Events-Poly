import { Button, Table, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
import FormTeachersRef from '../components/FormTeachersRef';
import { useDispatch } from 'react-redux';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';

const TeacherPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([
        { title: 'Quản lý giảng viên', path: `/manage/teacher` },
      ]),
    );
  }, [dispatch]);
  const modalTeachersRef = useRef();

  const colums = [
    {
      title: 'STT',
      key: 'item',
      dataIndex: 'item',
      width: '5%',
    },
    // {
    //   title: 'Họ và tên',
    //   key: 'fullName',
    //   dataIndex: 'fullName',
    //   width: '10%',
    // },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '10%',
    },
    // {
    //   title: 'Số điện thoại',
    //   key: 'phone',
    //   dataIndex: 'phone',
    //   width: '10%',
    // },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      width: '7%',
      render: (_, record) => (
        <div className='tw-justify-center tw-flex  tw-items-center tw-mb-1 tw-text-center'>
          <Tooltip title="Xóa giảng viên" color='#FF6D28'>
            <ConfirmPopup content={
              <Button
              className="dark:hover:tw-text-blue-400 tw-cursor-pointer dark:tw-text-white tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-shadow-none"
              >
                <DeleteOutlined />
              </Button>
            }
            title="Bạn muốn xóa môn học này?"
            onConfirm={() => console.log('Xóa')}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const dataSource = [
    {
      id: 1,
      key: 1,
      item: '1',
      fullName: 'Lê Trọng Đạt',
      email: 'datlt34@fpt.edu.vn',
      phone: '0988991496',
    },
    {
      id: 2,
      key: 2,
      item: '2',
      fullName: 'Tân Văn Sơn',
      email: 'sontv8@fpt.edu.vn',
      phone: '0393737072',
    },
    {
      id: 3,
      key: 3,
      item: '3',
      fullName: 'Trần Hữu Thiện',
      email: 'thienth@fpt.edu.vn',
      phone: '1234567189',
    },
  ];
  return (
    <>
      <Helmet>
        <title> Giảng viên </title>
      </Helmet>
      <div className="tw-mb-3 tw-flex tw-justify-end tw-gap-x-3">
        <span>
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={() => modalTeachersRef.current.show('ADD')}
            className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700 dark:tw-text-slate-100 dark:hover:tw-text-blue-300"
          >
            Thêm giảng viên
          </Button>
        </span>
      </div>
      <div>
        <Table
          size="small"
          scroll={{ y: 380 }}
          columns={colums}
          pagination={false}
          dataSource={dataSource}
        />
        <FormTeachersRef ref={modalTeachersRef} /> 
      </div>
    </>
  );
};

export default TeacherPage;
