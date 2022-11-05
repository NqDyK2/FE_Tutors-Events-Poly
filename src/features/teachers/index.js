import { Button, Table, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async'

const TeacherPage = () => {
  const colums = [
    {
      title: "STT",
      key: 'item',
      dataIndex: "item",
      width: "5%"
    },
    {
      title: "Họ và tên",
      key: "fullName",
      dataIndex: "fullName",
      width: "10%",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "10%",
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
      width: "10%"
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      width: '7%',
      render: (_, record) => (
        <div className='tw-justify-center tw-flex tw-gap-2 tw-items-center tw-mb-1 tw-text-center'>
          <Tooltip title='Sửa thông tin giảng viên' color="#FF6D28">
            <EditOutlined />
          </Tooltip>
          <Tooltip title="Xóa giảng viên" color='#FF6D28'>
            <DeleteOutlined />
          </Tooltip>
        </div>
      )
    }
  ]
  const dataSource = [
    {
      id: 1,
      item: '1',
      fullName: "Lê Trọng Đạt",
      email: "datlt34@fpt.edu.vn",
      phone: "0988991496",
    },
    {
      id: 2,
      item: '2',
      fullName: "Tân Văn Sơn",
      email: "sontv8@fpt.edu.vn",
      phone: "0393737072",
    },
    {
      id: 3,
      item: "3",
      fullName: "Trần Hữu Thiện",
      email: "thienth@fpt.edu.vn",
      phone: "1234567189",
    },
  ]
  return (
    <>
      <Helmet>
        <title> Giảng viên </title>
      </Helmet>
      <div className="tw-flex tw-justify-end tw-mb-3 tw-gap-x-3">
        <span>
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            // onClick={() => modalRef.current.show('ADD', location.state)}
            className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100"
          >
            Thêm buổi học
          </Button>
        </span>
      </div>
      <div>
        <Table
          size='small'
          scroll={{ y: 380 }}
          columns={colums}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    </>
  )
}

export default TeacherPage