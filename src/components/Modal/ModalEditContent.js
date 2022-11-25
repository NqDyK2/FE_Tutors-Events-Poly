import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateLessonMutation } from '../../app/api/lessonApiSlice';
import QuillEditor from '../QuillEditor';

const ModalEditContent = ({ data }) => {
  const [updateLesson, { isLoading: updateLoading }] =
    useUpdateLessonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = React.useState(null);
  const [form] = Form.useForm();
  const showModal = () => {
    form.setFieldsValue({
      content: data.content,
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
  const onFinished = (values) => {
    const content = {
      content: values.content,
      id: data.id,
      classroom_id: data.classroom_id,
      teacher_email: data.teacher_email,
      type: data.type,
    };

    updateLesson(content)
      .unwrap()
      .then((res) => {
        setIsModalOpen(false);
        form.resetFields();
        setErrors(null);
        toast.success('Cập nhật nội dung buổi học thành công');
      })
      .catch((error) => {
        setErrors(error.data);
      });
  };

  return (
    <div>
      <Tooltip title="Sửa nội dung buổi học" color="#FF6D28">
        <Button
          type="link"
          onClick={showModal}
          className="tw-border-none tw-bg-transparent tw-px-2 tw-text-gray-700 tw-shadow-none hover:tw-bg-transparent hover:tw-text-blue-500 dark:tw-text-white dark:hover:tw-text-hoverLink"
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        forceRender
        getContainer={false}
        destroyOnClose
        className="-tw-mt-[70px] tw-w-full md:tw-w-3/5"
        title="Sửa nội dung buổi học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        confirmLoading={updateLoading}
        okButtonProps={{
          className:
            'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
        }}
        cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
      >
        <Form
          form={form}
          preserve={false}
          onFinish={onFinished}
          onChange={() => {
            setErrors(null);
          }}
          layout="vertical"
          initialValues={{
            type: 1,
          }}
        >
          <Form.Item
            name="content"
            label="Nội dung: "
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung tóm tắt của buổi học.',
              },

              {
                validator: (_, value) => {
                  if (value?.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                    return Promise.reject(
                      'Nội dung tóm tắt không được để trống',
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <QuillEditor
              setFieldsValue={(value) => {
                form.setFieldsValue({
                  content: value,
                });
              }}
              placeholder="Nhập nội dung tóm tắt của buổi học"
              initialValue={form.getFieldValue('content')}
            />
          </Form.Item>
        </Form>
        {!!errors && (
          <div className="tw-text-red-500">{errors?.data?.message}</div>
        )}
      </Modal>
    </div>
  );
};

export default ModalEditContent;
