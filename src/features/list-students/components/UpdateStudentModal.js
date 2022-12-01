import { EditOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Modal, Radio, Tooltip } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateStudentMutation } from '../../../app/api/studentApiSlice';
const { TextArea } = Input;

const UpdateStudentModal = (props) => {
  const [updateStudent, { isLoading: updateLoading }] =
    useUpdateStudentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = React.useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    form.setFieldsValue({
      student_email: props.data.studentMail,
      reason: props.data.reason,
      is_warning: !!props.data.is_warning,
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setErrors(null);
  };
  // form
  const onFinish = (values) => {
    const data = {
      id: props.data.id,
      is_warning: +values.is_warning,
      reason: values.reason,
      student_email: values.student_email,
    };

    updateStudent(data)
      .then((response) => {
        if (response.data) {
          setIsModalOpen(false);
          toast.success(response.data.message);
          form.resetFields();
          setErrors(null);
        } else if (response.error) {
          setErrors(response.error);
          setErrors(null);
        }
      })
      .catch((error) => {
        setErrors(error.data);
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div>
      <Tooltip title="Cập nhật sinh viên" color="#FF6D28">
        <button className="hover:tw-bg-transparent" onClick={showModal}>
          <EditOutlined style={{ color: '#1890ff' }} />
        </button>
      </Tooltip>
      <Modal
        title="Cập nhật sinh viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sửa"
        confirmLoading={updateLoading}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{
            name: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email:"
            name="student_email"
            rules={[
              {
                type: 'email',
                message: 'Địa chỉ email không đúng định dạng.',
              },
              {
                required: true,
                message: 'Địa chỉ email không được để trống.',
              },
            ]}
          >
            <Input disabled className="tw-bg-gray-100 tw-text-gray-500" />
          </Form.Item>
          <Form.Item label="Nguyên nhân: " name="reason">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item name="is_warning" valuePropName="checked">
            <Checkbox>Cần bổ trợ thêm</Checkbox>
          </Form.Item>
        </Form>
        {!!errors && (
          <div className="tw-text-red-500">{errors?.data?.message}</div>
        )}
      </Modal>
    </div>
  );
};

export default UpdateStudentModal;
