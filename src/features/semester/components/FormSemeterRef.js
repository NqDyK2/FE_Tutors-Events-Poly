import { Form, Input, Modal } from 'antd';
import React, { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import './styles.css';

const FormSemeterRef = (props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      setVisible(true);
      if (caseForm === 'add') {
        setTitle('Thêm kì học');
      } else {
        setTitle('Sửa kì học');
        form.setFieldsValue(data);
      }
    },

    hide: () => {
      setVisible(false);
    },

  }));



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
      title={title}
      open={visible}
      onOk={() => {
        form.submit();
      }}
      destroyOnClose={true}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
      okText='Lưu'
      confirmLoading={loading}
      getContainer={false}
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
