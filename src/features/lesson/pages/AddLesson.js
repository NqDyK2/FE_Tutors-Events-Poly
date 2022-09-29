import React from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import './styles.css';
import { useLocation } from 'react-router-dom';
import { useGetListClassInSemesterQuery, useGetListStudentInCLassQuery } from '../../../app/api/semesterApiSlice';
import { useAddLessonMutation } from '../../../app/api/lessonApiSlice';
const { RangePicker } = DatePicker;

const AddLesson = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const id = location.state?.id;
  console.log(id);
  // const { data1,error1,isLoading1} = useGetListClassInSemesterQuery(id);
  const { data: classList,error: classError,isLoading: classLoading} = useGetListClassInSemesterQuery(id);
  
  const { data2,error2,isLoading2 } = useGetListStudentInCLassQuery(id);
  console.log(classList);
  console.log(classError);
  console.log(data2);
  const [addLesson] = useAddLessonMutation()
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await  addLesson({
      classroom_id: values.ID,
      class_location: values.position,
      type: values.type,
      date: {
        start_time: values.date[0].format('DD-MM-YY HH:mm'),
        end_time: values.date[1].format('DD-MM-YY HH:mm'),
      },

    })
  };

  return (
    <div>
      <h5 className='tw-text-[16px] tw-text-center tw-mb-6 dark:tw-text-slate-100'>
        Thêm nội dung học - Lớp <span>We16305</span> - Kỳ{' '}
        <span>Summer 2022</span>
      </h5>
      {id}
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
        >
          <Form.Item label="Lớp học"
            rules={
              [
                {
                  required: true,
                  message: 'Vui lòng nhập lớp học',
                },
              ]
            }
            name='ID'
          >
            <Input  value={id} />
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
              format={'DD/MM/YYYY HH:mm'}
              disabledDate={(current) => {
                return current && current <= Date.now().valueOf();
              }}
              showSecond={false}
              order={true}
            />
          </Form.Item>
          <Form.Item label="Hình thức:"
            name={'type'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập hình thức học',
              },
            ]}>
            <Radio.Group>
              <Radio value="0"> Online </Radio>
              <Radio value="1"> Offline </Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            label='Hình thức'
            name={'type'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập hình thức học',
              },
            ]}
          >


            <Select placeholder='Chọn hình thức buổi học'>
              <Select.Option value='online'>Online</Select.Option>
              <Select.Option value='offline'>Offline</Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item className='tw-flex tw-items-center  tw-justify-center'>
            <Button
              className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl 
                            tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm 
                            tw-text-center tw-mr-2 tw-mb-2 '
              htmlType='submit'
            >
              Thêm buổi học
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddLesson;
