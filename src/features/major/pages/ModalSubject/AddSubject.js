
import { Form, Input, Modal } from 'antd';
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
            .then(() => {
                setIsModalOpen(false);
                toast.success("Thêm môn học thành công.");
                form.resetFields();
            })
            .catch(() => {
                toast.error("Thêm môn học thất bại.");
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <a className='tw-text-sm tw-p-3'>
                <span onClick={showModal}>
                    + Thêm môn học
                </span>
            </a>
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
                                message: 'Required',
                            },
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