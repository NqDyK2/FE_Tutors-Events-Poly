import { DatePicker, Form, Input, Modal } from 'antd';
import moment from 'moment';
import React, { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import { useAddSemesterMutation } from '../../../app/api/semesterApiSlice';
// import { split } from 'lodash';
import './styles.css';

const { RangePicker } = DatePicker;

const FormSemeterRef = (props, ref) => {
  const [addSemester, { isLoading: addLoading }] = useAddSemesterMutation();
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [form] = Form.useForm();
  const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT',
  };
  const [mode, setMode] = React.useState(MODE.ADD);
  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      setVisible(true);
      if (caseForm === MODE.ADD) {
        setTitle('Thêm kì học');
        setMode(MODE.ADD);
      } else {
        setTitle('Sửa kì học');
        setMode(MODE.EDIT);
        form.setFieldsValue({
          name: data.name,
          time: [
            moment(data.start_time, 'YYYY-MM-DD HH:mm:ss'),
            moment(data.end_time, 'YYYY-MM-DD HH:mm:ss'),
          ],
        });
      }
    },

    hide: () => {
      setVisible(false);
    },
  }));

  const onFinish = (values) => {
    const data = {
      name: values.name,
      start_time: values.time[0].format('YYYY-MM-DD'),
      end_time: values.time[1].format('YYYY-MM-DD'),
    };
    switch (mode) {
      case MODE.ADD:
        addSemester(data)
          .unwrap()
          .then((res) => {
            setVisible(false);
            toast.success('Thêm thành công');
          })
          .catch((err) => {
            setError(err.data);
          });
        break;
      case MODE.EDIT:
        setTimeout(() => {
          setVisible(false);
          toast.success('Sửa thành công cái nịt');
        }, 1000);
        break;
      default:
    }
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
        setError(null);
        form.resetFields();
      }}
      okText='Lưu'
      confirmLoading={addLoading}
      destroyOnClose
      okButtonProps={{
        className:
          'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
      }}
      cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
      getContainer={false}
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
          onChange={() => {
            setError(null);
          }}
        >
          <Form.Item
            name='name'
            label='Tên kì:'
            rules={[
              { required: true, message: 'Tên kỳ không được trống' },
              {
                min: 5,
                message: 'Tên kỳ phải có ít nhất 5 ký tự',
              },
            ]}
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
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <RangePicker
              className='tw-w-full'
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
              label='test'
              format={'DD/MM/YYYY'}
              onChange={() => {
                setError(null);
              }}
            />
          </Form.Item>
        </Form>

        <div>
          {error && (
            <div className='tw-text-red-500'>
              {/* {split(error?.message, '(')[0]} */}
              {error?.errors?.name && <div>{error?.errors?.name}</div>}
              {error?.errors?.start_time && (
                <div>{error?.errors?.start_time}</div>
              )}
              {error?.errors?.end_time && <div>{error?.errors?.end_time}</div>}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(FormSemeterRef);
