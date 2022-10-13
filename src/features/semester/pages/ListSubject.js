import React, { useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, List, Modal, Radio, Space, Spin, Table } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaReply } from 'react-icons/fa';
import { useGetListClassInSemesterQuery } from '../../../app/api/semesterApiSlice';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormImportExcelRef from '../components/FormImportExcelRef';

const SubjectPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetListClassInSemesterQuery(id);
  const [form] = Form.useForm();

  const modalRef = useRef();
  // modal antd
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // table antd
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
    },
    {
      title: 'Lớp',
      // dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Link to={`/manage/class/${record.id}`}>
          <div className='tw-capitalize'>{record.name}</div>
        </Link>
      )
    },
    {
      title: 'Mã môn',
      dataIndex: 'mamon',
      key: 'mamon',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangvien',
      key: 'giangvien',
    },
    {
      title: 'Buổi học',
      dataIndex: 'buoihoc',
      key: 'buoihoc',
    },
    {
      title: 'Sinh viên',
      dataIndex: 'sinhvien',
      key: 'sinhvien',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <FaEdit size={'18px'} className='tw-cursor-pointer' onClick={showModal} />
        </Space>
      ),
    },
  ];
  const dataSource = data?.data?.map((item, index) => ({
    key: index + 1,
    id: item.id,
    name: item.name,
    mamon: item.subject_code,
    giangvien: item.default_teacher_email,
    buoihoc: item.lessons_count,
    sinhvien: item.class_students_count
  }))
  // form antd
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Helmet>
        <title>FPoly</title>
      </Helmet>

      <div className='tw-flex tw-justify-between tw-border-b-2 tw-pb-1'>
        <span className='tw-text-[15px] dark:tw-text-white'>Danh sách lớp học</span>
        <div className='tw-flex tw-items-center tw-gap-x-3'>
          <Button
            icon={<PlusCircleOutlined />}
            className='hover:tw-bg-transparent tw-flex tw-items-center tw-rounded-md tw-border-2   tw-px-2 dark:tw-text-slate-100 hover:tw-text-orange-600 tw-text-orange-500'
            type='text'
            onClick={() => modalRef.current.show()}
          >
            Import from excel
          </Button>
          <Link
            to={`/manage`}
            className='tw-flex tw-items-center hover:tw-text-blue-600'
          >
            <FaReply className='tw-mr-1' /> Trở lại
          </Link>
        </div>
      </div>

      <div className='tw-mt-4'>
        {isLoading && <Spin />}
        {error && <p>Error</p>}
        {data && (
          <>
            <Table
              size="small"
              scroll={{ y: 380 }}
              dataSource={dataSource}
              columns={columns}
            />
            <Modal
              title="Chỉnh sửa lớp học"
              open={isModalOpen}
              onOk={handleOk}
              style={{ top: 20 }}
              onCancel={handleCancel}
              width={700}
            >
              <div>
                <Form
                  form={form}
                  initialValues={{
                    lophoc: '',
                    kyhoc: '',
                    phonghoc: '',
                    linkonline: '',
                    gianvien: '',
                    sinhvienhotro: ''
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item required name='lophoc' label="Lớp học">
                    <Input />
                  </Form.Item>
                  <Form.Item required name='kyhoc' label="Kỳ học">
                    <Input />
                  </Form.Item>
                  <Form.Item required name='phonghoc' label="Phòng học">
                    <Input />
                  </Form.Item>
                  <Form.Item required name='linkonline' label="Link học online">
                    <Input />
                  </Form.Item>
                  <Form.Item name='gianvien' label="Giảng viên">
                    <Input />
                  </Form.Item>
                  <Form.Item name='sinhvienhotro' label="Sinh viên hỗ trợ">
                    <Input />
                  </Form.Item>

                </Form>
              </div>
            </Modal>
          </>
        )}
        <FormImportExcelRef ref={modalRef} />
      </div>
    </>
  );
};

export default SubjectPage;
