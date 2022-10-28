/* eslint-disable jsx-a11y/anchor-is-valid */
import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const AddMajors = () => {
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
            <div
                onClick={showModal}
                className="tw-border-none tw-text-[#1890ff] tw-flex tw-flex-row-reverse tw-mb-4 tw-cursor-pointer"
            >
                + Thêm chuyên ngành
            </div>
            <Modal
                title="Thêm chuyên ngành"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
            >
                <Form
                    name="basic"
                    initialValues={{
                        chuyennganh: '',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Tên chuyên ngành"
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
                </Form>
            </Modal>
        </div>
    )
}

export default AddMajors