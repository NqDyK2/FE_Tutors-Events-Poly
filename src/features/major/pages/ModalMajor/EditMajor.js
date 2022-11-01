/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateMajorMutation } from '../../../../app/api/MajorApiSlice';

const EditMajor = (props) => {
    const [updateMajor, { isLoading: updateLoading }] = useUpdateMajorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        form.setFieldsValue({
            name: props.data.name
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
            name: values.name
        }
        updateMajor({ ...data, id: props.data.id })
            .then(() => {
                toast.success("Cập nhật chuyên ngành thành công")
            })
            .catch(() => {
                toast.error("Cập nhật chuyên ngành thất bại")
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <div className='tw-cursor-pointer' onClick={showModal}>
                Sửa ngành học
            </div>
            <Modal
                title="Sửa tên ngành học"
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
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Tên chuyên ngành"
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
                </Form>
            </Modal>
        </div>
    )
}

export default EditMajor