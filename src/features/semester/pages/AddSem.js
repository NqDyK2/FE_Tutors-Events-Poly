/* eslint-disable no-unused-vars */
import { Form, Input, DatePicker, Button } from 'antd'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form';
import { useAddSemesterMutation } from '../../../app/api/semesterApiSlice';


const { RangePicker } = DatePicker;
const AddSem = () => {
    const [addSemester] = useAddSemesterMutation();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => {
        addSemester(data)
        console.log("data", data);
    }
    return (
        <>
            <Helmet>
                <title>Thêm kì học</title>
            </Helmet>
            <div>
                <h1 className='tw-text-center tw-mb-10 tw-text-2xl'> THÊM KÌ HỌC </h1>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout='horizontal'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Item label="Tên kì:">
                        <Input  {...register('name', { required: true, minLength: 5, maxLength: 100 })} />
                        {/* {...register('name', { required: true, minLength: 5, maxLength: 100 })} */}
                        {/* <p className='tw-text-red-500'>
                            {errors.name?.type === 'required' && "Không bỏ trống trường"}
                            {errors.name?.type === 'minLength' && "Nhập đủ ít nhất 5 ký tự"}
                            {errors.name?.type === 'minLength' && "Chỉ có thể nhập ít hơn 100 ký tự"}
                        </p> */}
                    </Form.Item>
                    <Form.Item label='Thời gian:'>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="Thời gian bắt đầu:">
                        <DatePicker  {...register('start_time')} />
                        {/* {...register('start_time')} */}
                    </Form.Item>
                    <Form.Item label="Thời gian kết thúc:">
                        <DatePicker {...register('end_time')} />
                        {/* {...register('end_time')} */}
                    </Form.Item>
                    <Form.Item
                        label=''
                        className='tw-flex tw-items-center  tw-justify-center'
                    >
                        <Button className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2 '>
                            Tạo
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default AddSem