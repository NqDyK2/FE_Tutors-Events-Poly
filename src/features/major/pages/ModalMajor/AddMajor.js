import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddMajorMutation } from '../../../../app/api/majorApiSlice';

const AddMajor = () => {
    const [AddMajor, { isLoading: majorLoading }] = useAddMajorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
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
    };
    return (
        <div>
            <div
                onClick={showModal}
                className="tw-border-none tw-text-[#1890ff] tw-flex tw-flex-row-reverse tw-mb-4 tw-cursor-pointer"
            >
                + Thêm ngành học
            </div>
            <Modal
                title="Thêm ngành học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={majorLoading}
                okText="Thêm"
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{
                        name: '',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Tên ngành học"
                        name="name"
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