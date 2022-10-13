import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';

const ModalListSubject = () => {
    const [form] = Form.useForm();
    // modal antd
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
    // form antd
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <FaEdit size={'18px'} className='tw-cursor-pointer' onClick={showModal} />
            {/* Modal edit lớp học */}
            <Modal
                title="Chỉnh sửa lớp học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <div>
                    <Form
                        form={form}
                        initialValues={{
                            lophoc: '',
                            kyhoc: '',
                            phonghoc: '',
                            linkonline: '',
                            gianvien: '',
                            sinhvienhotro: ''
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <div className='tw-flex tw-justify-between'>
                            <div className='tw-w-[49%]'>
                                <Form.Item required name='lophoc' label="Lớp học">
                                    <Input />
                                </Form.Item>
                                <Form.Item required name='kyhoc' label="Kỳ học">
                                    <Input />
                                </Form.Item>
                                <Form.Item required name='phonghoc' label="Phòng học">
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className='tw-w-[49%]'>
                                <Form.Item required name='linkonline' label="Link học online">
                                    <Input />
                                </Form.Item>
                                <Form.Item name='gianvien' label="Giảng viên">
                                    <Input />
                                </Form.Item>
                                <Form.Item name='sinhvienhotro' label="Sinh viên hỗ trợ">
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default ModalListSubject