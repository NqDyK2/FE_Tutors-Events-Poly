import React from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';

const { RangePicker } = DatePicker;

const AddLesson = () => {

    return (
        <div>
            <h5 className='tw-text-[16px] tw-text-center tw-mb-6'>
                Thêm nội dung học - Lớp <span>We16305</span> - Kỳ <span>Summer 2022</span>
            </h5>

            <div>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item label="Vị trí lớp học">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="Hình thức">
                        <Select placeholder="Chọn hình thức buổi học">
                            <Select.Option value="online">Online</Select.Option>
                            <Select.Option value="offline">Offline</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='tw-flex tw-items-center  tw-justify-center'>
                        <Button
                            className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl 
                            tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm 
                            tw-text-center tw-mr-2 tw-mb-2 '
                            type="submit"
                        >
                            Thêm buổi học
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddLesson