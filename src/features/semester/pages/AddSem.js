/* eslint-disable no-unused-vars */
import { Form, Input, DatePicker, Button } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAddSemesterMutation } from '../../../app/api/semesterApiSlice';

const { RangePicker } = DatePicker;
const AddSem = () => {
    const [addSemester] = useAddSemesterMutation();
    const [time, setTime] = React.useState(null);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        // console.log(values);
        await addSemester({
            name: values.name,
            time: {
                startTime: values.time[0].format('DD-MM-YYYY'),
                endTime: values.time[1].format('DD-MM-YYYY'),
            }
        })
    };


    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };
    return (
        <>
            <Helmet>
                <title>Thêm kì học</title>
            </Helmet>
            <div>
                <h1 className='tw-text-center tw-mb-10 tw-text-2xl'> THÊM KÌ HỌC </h1>
                <Form
                    form={form}
                    name='semeterForm'
                    initialValues={{
                        name: '',
                        time: '',
                    }}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout='horizontal'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='name'
                        labelCol={{ span: 24 }}
                        label='Name'
                        rules={[
                            { required: true, message: 'Name không được trống' },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    {/* <Form.Item label='Thời gian:'>
            <RangePicker />
          </Form.Item> */}
                    <Form.Item label='Thời gian bắt đầu:'
                        name={'time'}
                        rules={[
                            { required: true, message: 'không được trống' },
                        ]}
                    >
                        <RangePicker label="test"
                            format={'DD/MM/YYYY'}
                            onChange={(date, string) => {
                                console.log(
                                    date[0].format('DD/MM/YYYY'),
                                );
                                //    form.setFieldsValue({
                                //     time: string,
                                //    })
                            }} />
                    </Form.Item>
                    {/* <Form.Item label='Thời gian kết thúc:'>
            {...register('end_time')}
          </Form.Item> */}
                    <Form.Item
                        label=''
                        className='tw-flex tw-items-center  tw-justify-center'
                    >
                        <Button htmlType='submit' className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2 '>
                            Tạo
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AddSem;
