import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const AddMajor = () => {
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
        const data = {
            name: values.name
        }
        AddMajor(data)
            .then((response) => {
                setIsModalOpen(false);
                toast.success(response.massage);
                form.resetFields();
            })
            .catch(() => {
                toast.error("Thêm ngành học thất bại.");
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <a className='tw-pl-3 tw-mt-5 tw-text-sm' onClick={showModal}>
                + Thêm chuyên ngành
            </a>
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
                        nganhhoc: '',
                        chuyennganh: '',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Ngành học"
                        name="kyhoc"
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
                                message: 'Tên chuyên ngành không được để trống.',
                            },
                            {
                                min: 3,
                                message: 'Tên chuyên ngành phải lớn hơn 3 ký tự.'
                            },
                            {
                                max: 100,
                                message: 'Tên chuyên ngành phải nhỏ hơn 100 ký tự.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddMajor