import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useAddSubjectMutation } from '../../../../app/api/subjectApiSlice';
import { toast } from 'react-toastify';

const AddSubject = (props) => {
  const [addSubject, { isLoading: subjectLoading }] = useAddSubjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = React.useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setErrors(null);
  };
  // form
  const onFinish = (values) => {
    const data = {
      major_id: props.data.id,
      name: values.name,
      code: values.code,
    };
    addSubject(data)
      .then((response) => {
        if (response.data) {
          setIsModalOpen(false);
          toast.success(response.data.message);
          form.resetFields();
        } else if (response.error) {
          setErrors(response.error);
        }
      })
      .catch((err) => {
        setErrors(err.data);
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div>
      <Button className="tw-border-transparent tw-text-base hover:tw-bg-white">
        <span onClick={showModal}>+ Thêm môn học</span>
      </Button>
      <Modal
        title="Thêm môn học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        confirmLoading={subjectLoading}
      >
        <Form
          form={form}
          preserve={false}
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

export default AddSubject;
