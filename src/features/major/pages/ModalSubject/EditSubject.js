import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useUpdateSubjectMutation } from '../../../../app/api/subjectApiSlice';
import { toast } from 'react-toastify';

const ModalEditSubject = (props) => {
  const [updateSubject, { isLoading: updateLoading }] =
    useUpdateSubjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = React.useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    form.setFieldsValue({
      id: props.data.id,
      name: props.data.name,
      code: props.data.code,
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
      major_id: props.data.major_id,
      name: values.name,
      code: values.code,
    };
    updateSubject({ ...data, id: props.data.id })
      .then((response) => {
        if (response.data) {
          setIsModalOpen(false);
          toast.success(response.data.message);
          form.resetFields();
        } else if (response.error) {
          setErrors(response.error);
        }
      })
      .catch((error) => {
        setErrors(error.data);
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div>
      <Tooltip title="Sửa môn học" color="#FF6D28">
        <button className="hover:tw-bg-transparent" onClick={showModal}>
          <EditOutlined style={{ color: '#1890ff' }} />
        </button>
      </Tooltip>
      <Modal
        title="Sửa môn học"
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
            code: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Tên môn học"
            name="name"
            rules={[
              {
                required: true,
                message: 'Tên môn học không được để trống.',
              },
              {
                min: 3,
                message: 'Tên môn học phải lớn hơn 3 ký tự.',
              },
              {
                max: 100,
                message: 'Tên môn học phải nhỏ hơn 100 ký tự.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã môn"
            name="code"
            rules={[
              {
                required: true,
                message: 'Mã môn học không được để trống.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        {!!errors && (
          <div className="tw-text-red-500">{errors?.data?.message}</div>
        )}
      </Modal>
    </div>
  );
};

export default ModalEditSubject;
