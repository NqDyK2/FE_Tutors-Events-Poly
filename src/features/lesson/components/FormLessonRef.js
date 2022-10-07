import { DatePicker, Form, Input, Modal, Radio } from 'antd';
import moment from 'moment';
import React, { useEffect, useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import {
  useAddLessonMutation,
  useUpdateLessonMutation,
} from '../../../app/api/lessonApiSlice';
import './styles.css';
const MODE = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

const { RangePicker } = DatePicker;

const FormLessonRef = (props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [formLesson] = Form.useForm();
  const [typeOfLesson, setTypeOfLesson] = React.useState(1);
  const [error, setError] = React.useState(null);
  const [mode, setMode] = React.useState(MODE.ADD);

  const [addLesson, { isLoading: addLoading }] = useAddLessonMutation();
  const [updateLesson, { isLoading: updateLoading }] =
    useUpdateLessonMutation();

  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      setVisible(true);
      if (caseForm === MODE.ADD) {
        setTitle('Thêm buổi học - Môn ' + data.subjectName);
        formLesson.setFieldsValue({ 
          classroomId: data.subjectId,
          position_offline: data.default_offline_class_location || 'Chưa có data',
          position_online: data.default_online_class_location || 'Chưa có data',
          tutor_email: data.default_tutor_email || 'hiemdm@nu.de'
        });
        setMode(MODE.ADD);
      } else {
        let newData = {
          classroomId: data.classroom_id,
          position_offline: data.class_location_offline,
          position_online: data.class_location_online,
          type: data.type,
          tutor_email: data.tutor,
          date: [moment(data.start_time), moment(data.end_time)],
          teacher: data.teacher,
          lessonId: data.id,
        };
        formLesson.setFieldsValue(newData);
        setTypeOfLesson(data.type);
        setTitle('Sửa buổi học');
        setMode(MODE.EDIT);
      }
    },

    hide: () => {
      setVisible(false);
    },
  }));

  const onFinished = (values) => {
    let dataLesson = {
      classroom_id: +values.classroomId,
      type: +values.type,
      tutor_email: values.tutor_email,
      start_time: values.date[0].format('YYYY-MM-DD HH:mm:ss'),
      end_time: values.date[1].format('YYYY-MM-DD HH:mm:ss'),
    };

    if (typeOfLesson) {
      dataLesson = {
        ...dataLesson,
        class_location_offline: values.position_offline,
      };
      if (values.position_online) {
        dataLesson = {
          ...dataLesson,
          class_location_online: values.position_online,
        };
      }
    } else {
      dataLesson = {
        ...dataLesson,
        class_location_online: values.position_online,
      };
    }

    switch (mode) {
      case MODE.ADD:
        addLesson(dataLesson)
          .unwrap()
          .then((res) => {
            setVisible(false);
            toast.success('Thêm buổi học thành công');
          })
          .catch((error) => {
            setError(error);
          });
        break;
      case MODE.EDIT:
        updateLesson({ ...dataLesson, id: values.lessonId })
          .unwrap()
          .then((res) => {
            setVisible(false);
            toast.success('Sửa học thành công');
          })
          .catch((error) => {
            setError(error);
          });
        break;
      default:
    }
  };

  const onChangeType = (e) => {
    setTypeOfLesson(e.target.value);
  };

  useEffect(() => {
    if (typeOfLesson) {
      formLesson.validateFields(['position_online']);
    }
  }, [formLesson, typeOfLesson]);

  return (
    <Modal
      forceRender
      title={title}
      open={visible}
      okType='default'
      onOk={() => {
        formLesson.submit();
      }}
      onCancel={() => {
        setVisible(false);
        setError(null);
        setTypeOfLesson(1);
        formLesson.resetFields();
      }}
      okText='Lưu'
      confirmLoading={addLoading || updateLoading}
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
          form={formLesson}
          preserve={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinished}
          onChange={() => {
            setError(null);
          }}
          layout='horizontal'
          initialValues={{
            type: 1,
            teacher: 'hieudmph69',
          }}
        >
          <Form.Item className='tw-hidden' name='lessonId'>
            <Input hidden />
          </Form.Item>

          <Form.Item
            className='tw-hidden'
            label='Lớp học:'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lớp học',
              },
            ]}
            name='classroomId'
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            className='tw-hidden'
            label='Giảng viên'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giảng viên',
              },
            ]}
            name='teacher'
          >
            <Input disabled />
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
            <Radio.Group onChange={onChangeType}>
              <Radio value={1}> Offline </Radio>
              <Radio value={0}> Online </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label='Ngày:'
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
            label='Sinh viên hỗ trợ:'
            name='tutor_email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập sinh viên hỗ trợ',
              },
            ]}
          >
            <Input placeholder='chọn sinh viên hỗ trợ' />
          </Form.Item>

          {!typeOfLesson ? (
            <>
              <Form.Item label='Vị trí lớp học:'>
                <Input disabled />
              </Form.Item>

              <Form.Item
                label='Link học online:'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập link học',
                  },
                ]}
                name='position_online'
              >
                <Input placeholder={'Nhập link học online'} />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label='Vị trí lớp học'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập vị trí lớp học',
                  },
                ]}
                name='position_offline'
              >
                <Input placeholder={'Nhập vị trí lớp học'} />
              </Form.Item>

              <Form.Item
                label='Link học online'
                rules={[
                  {
                    required: false,
                  },
                ]}
                name='position_online'
              >
                <Input placeholder={'Nhập link học online'} />
              </Form.Item>
            </>
          )}
        </Form>

        <div>
          {error && (
            <div className='tw-text-red-500'>
              {error?.message || error?.data?.message}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(FormLessonRef);
