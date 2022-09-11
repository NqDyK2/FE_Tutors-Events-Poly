/* eslint-disable no-unused-vars */
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const AddClass = () => {
    return (
        <>
            <Helmet>
                <title>Tạo lớp - FPoly</title>
            </Helmet>
            <div>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item label="Tên lớp:">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Môn học:">
                        <Cascader
                            options={[
                                {
                                    value: 'Công nghệ thông tin',
                                    label: 'Công nghệ thông tin',
                                    children: [
                                        {
                                            value: 'Phát triển phần mềm',
                                            label: 'Phát triển phần mềm',
                                        },
                                        {
                                            value: 'Lập trình Web',
                                            label: 'Lập trình Web',
                                            children: [
                                                {
                                                    value: 'Xây dựng trang Web - WEB1013',
                                                    label: 'Xây dựng trang Web - WEB1013',
                                                },
                                                {
                                                    value: 'Lập trình với JavaScript',
                                                    label: 'Lập trình với JavaScript',
                                                },
                                                {
                                                    value: 'Thiết kế web với HTML5 & CSS3',
                                                    label: 'Thiết kế web với HTML5 & CSS3',
                                                },

                                            ]
                                        },
                                        {
                                            value: 'Lập trình Mobile',
                                            label: 'Lập trình Mobile',
                                        },
                                        {
                                            value: 'Ứng dụng phần mềm',
                                            label: 'Ứng dụng phần mềm',
                                        },
                                        {
                                            value: 'Xử lý dữ liệu',
                                            label: 'Xử lý dữ liệu',
                                        },
                                    ],
                                },
                                {
                                    value: 'Quản trị kinh doanh',
                                    label: 'Quản trị kinh doanh',
                                    children: [
                                        {
                                            value: 'Digital Marketing',
                                            label: 'Digital Marketing',
                                        },
                                        {
                                            value: 'Quan hệ công chúng & tổ chức sự kiện',
                                            label: 'Quan hệ công chúng & tổ chức sự kiện',
                                        },
                                        {
                                            value: 'Marketing & Sales',
                                            label: 'Marketing & Sales',
                                        },
                                        {
                                            value: 'Quản trị khách sạn',
                                            label: 'Quản trị khách sạn',
                                        },
                                        {
                                            value: 'Quản trị nhà hàng',
                                            label: 'Quản trị nhà hàng',
                                        },
                                        {
                                            value: 'Logistic',
                                            label: 'Logistic',
                                        },
                                    ],
                                },
                            ]}

                        />
                    </Form.Item>
                    <Form.Item label="Thời gian:">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="Online/Offline:">
                        <Radio.Group>
                            <Radio value="apple"> Online </Radio>
                            <Radio value="pear"> Offline </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Thêm sinh viên:" valuePropName="fileList">
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="">
                        <Button className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2'>Tạo</Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default AddClass