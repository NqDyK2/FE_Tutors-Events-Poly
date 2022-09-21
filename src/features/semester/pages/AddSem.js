import { Form, Input, DatePicker, Button } from 'antd'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const { RangePicker } = DatePicker;
const AddSem = () => {
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
                >
                    <Form.Item label="Tên kì:">
                        <Input />
                    </Form.Item>
                    <Form.Item label='Thời gian:'>
                        <RangePicker />
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