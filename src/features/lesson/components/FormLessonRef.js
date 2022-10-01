import { Button, DatePicker, Form, Input, Modal, Radio } from 'antd';
import React, { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import { useAddLessonMutation } from '../../../app/api/lessonApiSlice';
import './styles.css';


const { RangePicker } = DatePicker

const FormLessonRef = (props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [formLesson] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  
  const [addLesson, { isLoading: addLoading, addError, addSuccess }] = useAddLessonMutation();

  useImperativeHandle(ref, () => ({
        show: (caseForm, data) => {
          setVisible(true);
          if (caseForm === 'add') {
            setTitle('Thêm buổi học');
          } else {
            setTitle('Sửa buổi học');
            formLesson.setFieldsValue(data);
          }
      },

      hide: () => {
        setVisible(false);
      },
  }));

  const onFinished = (values) => {
    if (title === 'Thêm buổi học') {
      addLesson({
        classroom_id: values.ID,
        class_location: values.position,
        type: values.type,
        start_time: values.date[0].format('YYYY-MM-DD HH:mm:ss'),
        end_time: values.date[1].format('YYYY-MM-DD HH:mm:ss'),
      });
    }
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
        formLesson.submit();
      }}
      onCancel={() => {
        setVisible(false);
        formLesson.resetFields();
      }}
      okText='Lưu'
      confirmLoading={loading}
      destroyOnClose
      okButtonProps={{className: 'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none'}}
      cancelButtonProps={{className: 'hover:tw-bg-transparent'}}
    >
      <div>
        <Form
            getContainer={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            form={formLesson}
            onFinish={onFinished}
            preserve={false}
            layout='horizontal'
        >
            <Form.Item
              label='Lớp học'
              rules={[
                  {
                  required: true,
                  message: 'Vui lòng nhập lớp học',
                  },
              ]}
              name='ID'
            >
                <Input/>
            </Form.Item>
            
            <Form.Item
              label='Giảng viên'
              rules={[
                  {
                  required: true,
                  message: 'Vui lòng nhập giảng viên',
                  },
              ]}
              name='teacher'
            >
                <Input/>
            </Form.Item>

            <Form.Item
              label='Vị trí lớp học'
              rules={[
                  {
                  required: true,
                  message: 'Vui lòng nhập vị trí lớp học',
                  },
              ]}
              name='position'
            >
            <Input placeholder={'Nhập vị trí lớp học'} />
            </Form.Item>

            <Form.Item
              label='Ngày'
              name={'date'}
              rules={[
                  {
                  required: true,
                  message: 'Vui lòng nhập thời gian',
                  },
              ]}
            >
            <RangePicker
                placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
                showTime
                showNow={true}
                allowClear
                format={'DD/MM/YYYY HH:mm'}
                disabledDate={(current) => {
                return current && current <= Date.now().valueOf();
                }}
                showSecond={false}
                order={true}
            />
            </Form.Item>

            <Form.Item
                label='Hình thức:'
                name={'type'}
                rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập hình thức học',
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value='0'> Online </Radio>
                    <Radio value='1'> Offline </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
              label='Sinh viên hỗ trợ'
              rules={[
                  {
                  required: true,
                  message: 'Vui lòng nhập sinh viên hỗ trợ',
                  },
              ]}
              name='student_support'
            >
                <Input placeholder='chọn sinh viên hỗ trợ'/>
            </Form.Item>

        </Form>
      </div>
    </Modal>
  );
};

export default forwardRef(FormLessonRef);
