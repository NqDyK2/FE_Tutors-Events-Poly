import React, { useEffect, useImperativeHandle } from 'react';
import { DatePicker, Form, Input, Modal, Radio } from 'antd';
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
          position_offline: data.default_offline_class_location || 'No data',
          position_online: data.default_online_class_location || 'No data',
          tutor_email: data.default_tutor_email || 'hiemdm@nu.de',
          teacher_email: 'hieudmph69@fe.vn',
        });
        setMode(MODE.ADD);
      } else {
        let newData = {
          teacher_email: data.teacher_email,
          classroomId: data.classroom_id,
          position_offline: data.class_location_offline,
          position_online: data.class_location_online,
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
      tutor_email: values.tutor_email,
      start_time: values.date[0].format('YYYY-MM-DD HH:mm:00'),
      end_time: values.date[1].format('YYYY-MM-DD HH:mm:00'),
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
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinished}
          onChange={() => {
            setError(null);
          }}
          layout="horizontal"
          initialValues={{
            type: 1,
          }}
        >
          <Form.Item className="tw-hidden" name="lessonId">
            <Input hidden />
          </Form.Item>

          <Form.Item
            className="tw-hidden"
            label="Lớp học:"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lớp học',
              },
            ]}
            name="classroomId"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            className="tw-hidden"
            label="Giảng viên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giảng viên',
              },
            ]}
            name="teacher_email"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Hình thức:"
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
            label="Ngày:"
            name={'date'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời gian',
              },
            ]}
          >
            <RangePicker
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

          <Form.Item
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
            <Input placeholder="chọn sinh viên hỗ trợ" />
          </Form.Item>

          {!typeOfLesson ? (
            <>
              <Form.Item
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
                name="position_online"
                tooltip={{
                  title:
                    'Địa điểm học online: Đặt đường dẫn từ trình duyệt google meet / zoom / skype / msteams / …',
                  className: 'tw-text-xs',
                }}
              >
                <Input placeholder={'Nhập link học online'} />
              </Form.Item>

              <Form.Item className="tw-opacity-0"></Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="Link học online:"
                rules={[
                  {
                    required: false,
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
                tooltip={{
                  title:
                    'Địa điểm học online: Đặt đường dẫn từ trình duyệt google meet / zoom / skype / msteams / …',
                  className: 'tw-text-xs',
                }}
                name="position_online"
              >
                <Input placeholder={'Nhập link học online'} />
              </Form.Item>

              <Form.Item
                label="Vị trí lớp học"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập vị trí lớp học',
                  },
                ]}
                name="position_offline"
              >
                <Input placeholder={'Nhập vị trí lớp học'} />
              </Form.Item>
            </>
          )}
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
