import { Form, Input, Modal } from 'antd';
import React, { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import './styles.css';

const FormSemeterRef = (props, ref) => {
  const [visible, setVisible] = React.useState(false);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },

    hide: () => {
      setVisible(false);
    },
  }));
  const [loading, setLoading] = React.useState(false);
  const onFinished = (values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);

    toast.error('Có cái nịt :))');
  };

  return (
    <Modal
      title={'Tạo mới học kỳ'}
      open={visible}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setVisible(false);
      }}
      okText='Lưu'
      confirmLoading={loading}
    >
      <div>
        <Form form={form} layout='vertical' onFinish={onFinished}>
          <Form.Item
            label='Tên học kỳ'
            name='name'
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default forwardRef(FormSemeterRef);
