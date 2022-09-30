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
      toast.error('Có cái nịt :))');
    }, 2000);
  };

  return (
    <Modal
      title={title}
      open={visible}
      okType='default'
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
      okText='Lưu'
      confirmLoading={loading}
      destroyOnClose
      okButtonProps={{className: 'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none'}}
      cancelButtonProps={{className: 'hover:tw-bg-transparent'}}
    >
      <div>
        <Form form={form} layout='vertical' onFinish={onFinished} preserve={false}>
          <Form.Item
            label={<span className='dark:!tw-text-black'>Tên kì học</span>}
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
