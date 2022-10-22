import { Button, Cascader, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const ModalAddClass = () => {
  const [form] = Form.useForm();
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
  // form antd
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Button
        icon={<PlusCircleOutlined />}
        className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100"
        type="link"
        onClick={showModal}
      >
        Thêm lớp học
      </Button>
      <Modal
        title="Thêm lớp học"
        open={isModalOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        okText="Lưu"
      >
        <div>
          <Form
            form={form}
            initialValues={{
              semester: '',
              subject_name: '',
              default_teacher_email: '',
              tutors: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="semester"
              label="Kỳ học"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="subject_name"
              label="Môn học"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Cascader
                options={[
                  {
                    value: 'Công nghệ thông tin',
                    label: 'Công nghệ thông tin',
                    children: [
                      {
                        value: 'Phát triển phần mềm',
                        label: 'Phát triển phần mềm',
                      },
                      {
                        value: 'Lập trình Web',
                        label: 'Lập trình Web',
                        children: [
                          {
                            value: 'Xây dựng trang Web - WEB1013',
                            label: 'Xây dựng trang Web - WEB1013',
                          },
                          {
                            value: 'Lập trình với JavaScript',
                            label: 'Lập trình với JavaScript',
                          },
                          {
                            value: 'Thiết kế web với HTML5 & CSS3',
                            label: 'Thiết kế web với HTML5 & CSS3',
                          },
                        ],
                      },
                      {
                        value: 'Lập trình Mobile',
                        label: 'Lập trình Mobile',
                      },
                      {
                        value: 'Ứng dụng phần mềm',
                        label: 'Ứng dụng phần mềm',
                      },
                      {
                        value: 'Xử lý dữ liệu',
                        label: 'Xử lý dữ liệu',
                      },
                    ],
                  },
                  {
                    value: 'Quản trị kinh doanh',
                    label: 'Quản trị kinh doanh',
                    children: [
                      {
                        value: 'Digital Marketing',
                        label: 'Digital Marketing',
                      },
                      {
                        value: 'Quan hệ công chúng & tổ chức sự kiện',
                        label: 'Quan hệ công chúng & tổ chức sự kiện',
                      },
                      {
                        value: 'Marketing & Sales',
                        label: 'Marketing & Sales',
                      },
                      {
                        value: 'Quản trị khách sạn',
                        label: 'Quản trị khách sạn',
                      },
                      {
                        value: 'Quản trị nhà hàng',
                        label: 'Quản trị nhà hàng',
                      },
                      {
                        value: 'Logistic',
                        label: 'Logistic',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="default_teacher_email"
              label="Giảng viên"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Select placeholder="Chọn giảng viên" allowClear>
                <Option value="male">Híu Thường Tín</Option>
                <Option value="female">Híu Heniken</Option>
                <Option value="other">Híu iu bà xã</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="tutors"
              label="Người hướng dẫn"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddClass;
