import { Button, DatePicker, Form, Input, Modal } from 'antd';
import moment from 'moment';
import React, { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import { useAddSemesterMutation } from '../../../app/api/semesterApiSlice';
import './styles.css';

const { RangePicker } = DatePicker;

const FormSemeterRef = (props, ref) => {
  const [addSemester] = useAddSemesterMutation();
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  console.log('props', props);
  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      setVisible(true);
      if (caseForm === 'add') {
        setTitle('Thêm kì học');
      } else {
        setTitle('Sửa kì học');
        form.setFieldsValue(data);
        console.log('data', data);
      }
    },

    hide: () => {
      setVisible(false);
    },
  }));

  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      toast.success('Nịt');
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
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
      okButtonProps={{
        className:
          'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
      }}
      cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
    >
      <div>
        <Form
          form={form}
          preserve={false}
          name='semeterForm'
          initialValues={{
            name: '',
            time: '',
          }}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name='name'
            label='Tên kì:'
            rules={[{ required: true, message: 'Tên kỳ không được trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Thời gian kỳ học:'
            name={'time'}
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || value.length === 0) {
                    return Promise.reject('Thời gian không được trống');
                  }
                  if (
                    moment(value[1]).diff(moment(value[0]), 'months') > 5 ||
                    moment(value[1]).diff(moment(value[0]), 'months') < 4
                  ) {
                    return Promise.reject(
                      'Thời gian không hợp lệ, kỳ học phải từ 4-5 tháng'
                    );
                  }
                },
              }),
            ]}
          >
            <RangePicker
              className='tw-w-full'
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
              label='test'
              format={'DD/MM/YYYY'}
              disabledDate={(current) => {
                return current && current <= Date.now();
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default forwardRef(FormSemeterRef);
