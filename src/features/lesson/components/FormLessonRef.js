import React, { useEffect, useImperativeHandle } from 'react';
import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import moment from 'moment';
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
const { Option } = Select;

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

  const { semesterStartTime, semesterEndTime } = props.timeSemester;

  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      setVisible(true);
      if (caseForm === MODE.ADD) {
        setTitle('Thêm buổi học - Môn ' + data.subjectName);
        formLesson.setFieldsValue({
          classroomId: data.subjectId,
          teacher_email: data.teacherEmail || 'No data',
        });
        setMode(MODE.ADD);
      } else {
        let newData = {
          teacher_email: data.teacher_email,
          classroomId: data.classroom_id,
          class_location: data.class_location,
          type: data.type,
          tutor_email: data.tutor_email,
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
      teacher_email: values.teacher_email,
      classroom_id: +values.classroomId,
      type: +values.type,
      class_location: values.class_location,
      content: values.content,
      tutor_email: values.tutor_email,
      start_time: values.date[0].format('YYYY-MM-DD HH:mm:00'),
      end_time: values.date[1].format('YYYY-MM-DD HH:mm:00'),
    };

    switch (mode) {
      case MODE.ADD:
        console.log(dataLesson);
        addLesson(dataLesson)
          .unwrap()
          .then((res) => {
            setVisible(false);
            formLesson.resetFields();
            setTypeOfLesson(1);
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
            formLesson.resetFields();
            setTypeOfLesson(1);
            toast.success('Sửa học thành công');
          })
          .catch((error) => {
            setError(error);
          });
        break;
      default:
    }
  };

  const onChangeType = (values) => {
    setTypeOfLesson(values);
  };

  useEffect(() => {
    if (typeOfLesson) {
      formLesson.validateFields(['position_online']);
    }
  }, [formLesson, typeOfLesson]);

  return (
    <Modal
      className="tw-w-3/5"
      forceRender
      title={title}
      open={visible}
      okType="default"
      onOk={() => {
        formLesson.submit();
      }}
      onCancel={() => {
        setVisible(false);
        setError(null);
        setTypeOfLesson(1);
        formLesson.resetFields();
      }}
      okText="Lưu"
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
          onFinish={onFinished}
          onChange={() => {
            setError(null);
          }}
          layout="vertical"
          initialValues={{
            type: 1,
          }}
        >
          <Form.Item className="tw-hidden" name="lessonId">
            <Input hidden />
          </Form.Item>

          <Form.Item className="tw-hidden" name="classroomId">
            <Input />
          </Form.Item>

          <div className="tw-flex tw-items-center tw-justify-between">
            <Form.Item
              className="tw-w-[48%]"
              label="Thời gian:"
              name={'date'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thời gian',
                },
              ]}
            >
              <RangePicker
                className="tw-w-full"
                defaultPickerValue={
                  moment(semesterStartTime) >= moment()
                    ? moment(semesterStartTime)
                    : moment()
                }
                placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
                showTime
                allowClear
                format={'DD/MM/YYYY HH:mm'}
                disabledDate={(current) => {
                  const startDate = moment(semesterStartTime);
                  const endDate = moment(semesterEndTime);
                  return (
                    current &&
                    (current < startDate ||
                      current > endDate ||
                      current < moment())
                  );
                }}
                showSecond={false}
                order={true}
              />
            </Form.Item>

            <Form.Item className="tw-w-[48%]" name="content" label="Nội dung: ">
              <Input placeholder="Nội dung buổi học" />
            </Form.Item>
          </div>

          <div className="tw-flex tw-items-center tw-justify-between">
            <Form.Item
              className="tw-w-[48%]"
              label="Giảng viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giảng viên',
                },
              ]}
              name="teacher_email"
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="tw-w-[48%]"
              label="Sinh viên hỗ trợ:"
              name="tutor_email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập sinh viên hỗ trợ',
                },
                {
                  type: 'email',
                  message: 'Địa chỉ email không đúng định dạng',
                },
              ]}
            >
              <Input placeholder="Nhập sinh viên hỗ trợ" />
            </Form.Item>
          </div>

          <div className="tw-flex tw-items-center tw-justify-between">
            <Form.Item
              className="tw-w-[48%]"
              placeholder="Chọn hình thức học"
              label="Hình thức:"
              name={'type'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn hình thức học',
                },
              ]}
            >
              <Select onChange={onChangeType}>
                <Option value={1}>Offline</Option>
                <Option value={0}>Online</Option>
              </Select>
            </Form.Item>

            {!typeOfLesson ? (
              <>
                <Form.Item
                  className="tw-w-[48%]"
                  label="Link học online:"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập link học',
                    },
                    {
                      pattern:
                        // google meet regex pattern
                        /^((http:\/\/)|(https:\/\/))?(meet.google.com|(www.)?hangouts.google.com|(www.)?chat.google.com)\/.+$/ ||
                        // zoom
                        /https:\/\/[\w-]*\.?zoom.us\/(j|my)\/[\d\w?=-]+/g ||
                        // skype
                        /(skype:[a-z]+.*?|skype:.*)/g ||
                        // msteams
                        /(teams\.microsoft\.com).*(docId|D=1-).*?/g,

                      message: 'Link học online chưa đúng định dạng',
                    },
                  ]}
                  name="class_location"
                  tooltip={{
                    title:
                      'Địa điểm học online: Đặt đường dẫn từ trình duyệt google meet / zoom / skype / msteams / …',
                    className: 'tw-text-xs',
                  }}
                >
                  <Input placeholder={'Nhập link học online'} />
                </Form.Item>
              </>
            ) : (
              <Form.Item
                className="tw-w-[48%]"
                label="Vị trí lớp học: "
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập vị trí lớp học',
                  },
                ]}
                name="class_location"
              >
                <Input placeholder={'Nhập vị trí lớp học'} />
              </Form.Item>
            )}
          </div>
        </Form>

        <div>
          {error && (
            <div className="tw-text-red-500">
              {error?.message || error?.data?.message}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(FormLessonRef);
