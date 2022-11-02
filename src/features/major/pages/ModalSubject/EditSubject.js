import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useUpdateSubjectMutation } from '../../../../app/api/subjectApiSlice';
import { toast } from 'react-toastify';

const ModalEditSubject = (props) => {
    const [updateSubject] = useUpdateSubjectMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        form.setFieldsValue({
            id: props.data.id,
            name: props.data.name,
            code: props.data.code
        })
        setIsModalOpen(true);
    };
    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // form
    const onFinish = (values) => {
        const data = {
            major_id: props.data.major_id,
            name: values.name,
            code: values.code
        }
        updateSubject({ ...data, id: props.data.id })
            .then(() => {
                toast.success("Sửa môn học thành công.");
            })
            .catch(() => {
                toast.error("Sửa môn học thất bại");
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <div className='tw-cursor-pointer' onClick={showModal}>
                <EditOutlined style={{ color: '#1890ff' }} />
            </div>
            <Modal
                title="Sửa môn học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sửa"
                confirmLoading={updateLoading}
            >
                <Form
                    form={form}
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

export default ModalEditSubject