/* eslint-disable jsx-a11y/anchor-is-valid */
import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const EditMajors = () => {
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
            <div className='tw-cursor-pointer' onClick={showModal}>
                Sửa chuyên ngành
            </div>
            <Modal
                title="Sửa chuyên ngành"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sửa"
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

export default EditMajors