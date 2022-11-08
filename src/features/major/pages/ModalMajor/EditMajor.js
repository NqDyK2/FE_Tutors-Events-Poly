import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateMajorMutation } from '../../../../app/api/majorApiSlice';

const EditMajor = (props) => {
  const [updateMajor, { isLoading: updateLoading }] = useUpdateMajorMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = React.useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    form.setFieldsValue({
      name: props.data.name,
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
      name: values.name,
    };
    updateMajor({ ...data, id: props.data.id })
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
      <Button
        className="tw-cursor-pointer tw-border-transparent hover:tw-bg-white"
        onClick={showModal}
      >
        Sửa chuyên ngành
      </Button>
      <Modal
        title="Sửa tên ngành học"
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
            label="Tên chuyên ngành"
            name="name"
            rules={[
              {
                required: true,
                message: 'Tên chuyên ngành không được để trống.',
              },
              {
                min: 3,
                message: 'Tên chuyên ngành phải lớn hơn 3 ký tự.',
              },
              {
                max: 100,
                message: 'Tên chuyên ngành phải nhỏ hơn 100 ký tự.',
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

export default EditMajor;
