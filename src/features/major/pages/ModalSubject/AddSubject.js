
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useAddSubjectMutation } from '../../../../app/api/subjectApiSlice';
import { toast } from 'react-toastify';

const AddSubject = (props) => {
    const [addSubject, { isLoading: subjectLoading }] = useAddSubjectMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
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
            major_id: props.data.id,
            name: values.name,
            code: values.code
        }
        addSubject(data)
            .unwrap()
            .then((res) => {
                setIsModalOpen(false);
                toast.success(res.massage);
                form.resetFields();
            })
            .catch((err) => {
                toast.error("Thêm môn học thất bại");
            })
    };
    const onFinishFailed = (errorInfo) => {
    };
    return (
        <div>
            <Button className='tw-text-base tw-border-transparent hover:tw-bg-white'>
                <span onClick={showModal}>
                    + Thêm môn học
                </span>
            </Button>
            <Modal
                title="Thêm môn học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm"
                confirmLoading={subjectLoading}
            >
                <Form
                    form={form}
                    preserve={false}
                    name="basic"
                    initialValues={{
                        name: '',
                        code: ''
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Tên môn học"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên môn học không được để trống.',
                            },
                            {
                                min: 3,
                                message: 'Tên môn học phải lớn hơn 3 ký tự.'
                            },
                            {
                                max: 100,
                                message: 'Tên môn học phải nhỏ hơn 100 ký tự.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mã môn"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Mã môn học không được để trống.',
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

export default AddSubject