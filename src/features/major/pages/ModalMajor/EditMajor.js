import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const EditMajor = () => {
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
        updateMajor({ ...data, id: props.data.id })
            .then((res) => {
                toast.success(res.massage);
            })
            .catch(() => {
                toast.error("Cập nhật chuyên ngành thất bại");
            })
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
                title="Sửa môn học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sửa"
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

export default EditMajor