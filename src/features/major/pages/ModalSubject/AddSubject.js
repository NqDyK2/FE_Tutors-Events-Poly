/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const AddSubject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // form
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <a className='tw-pl-3 tw-text-sm tw-flex tw-ml-4' onClick={showModal}>
                + Thêm môn học...
            </a>
            <Modal
                title="Thêm môn học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
            >
                <Form
                    name="basic"
                    initialValues={{
                        nganhhoc: '',
                        chuyennganh: '',
                        tenmonhoc: ''
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Ngành học"
                        name="nganhhoc"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Chuyên ngành"
                        name="chuyennganh"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tên môn học"
                        name="tenmonhoc"
                        rules={[
                            {
                                required: true,
                                message: 'Required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddSubject