import { Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useFeedbackTutorMutation } from '../../../app/api/studentApiSlice';

const { TextArea } = Input;
const FeedBack = (props) => {
    const [feedbackTutor, { isLoading }] = useFeedbackTutorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = React.useState(null);
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
        setErrors(null);
    };
    // form
    const onFinish = (values) => {
        setErrors(null);
        const feedbackData = {
            id: props.id,
            classroom_quality: +values.classroom_quality,
            teacher_quality: +values.teacher_quality,
            tutor_quality: +values.tutor_quality,
            understand: +values.understand,
            message: values.message,
        }
        feedbackTutor(feedbackData)
            .unwrap()
            .then((res) => {
                toast.success(res.message);
                setIsModalOpen(false);
                form.resetFields();
                props.setSkip(new Date().getTime())
                props.setJoinClassLoading(new Date().getTime())
            })
            .catch((error) => {
                setErrors(error);
                props.setSkip(new Date().getTime())
                props.setJoinClassLoading(new Date().getTime())
            });
    };
    return (
        <div>
            <div
                onClick={showModal}
                className="tw-mb-4 tw-flex tw-cursor-pointer tw-flex-row-reverse tw-border-none tw-text-[#1890ff]"
            >
                Đánh giá
            </div>
            <Modal
                className='tw-top-5 tw-w-2/5'
                title="Đánh giá môn học"
                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={isLoading}
                onCancel={handleCancel}
                okText="Gửi phản hồi"
                okButtonProps={{
                    className:
                        'tw-bg-sky-500 tw-text-slate-100 hover:tw-bg-sky-600 tw-border-none',
                }}
                cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
            >
                <div>
                    <Form
                        form={form}
                        initialValues={{
                            classroom_quality: '',
                            teacher_quality: '',
                            tutor_quality: '',
                            understand: '',
                            message: '',
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn đánh giá của bạn.',
                                },
                            ]}
                            name="classroom_quality"
                            label="Bạn thấy chất lượng giảng dạy như thế nào?"
                        >
                            <Radio.Group>
                                <Radio value="1"> Tốt </Radio>
                                <Radio value="2"> Trung bình </Radio>
                                <Radio value="3"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn đánh giá của bạn.',
                                },
                            ]}
                            name="teacher_quality"
                            label="Giảng viên hỗ trợ môn tốt không?"
                        >
                            <Radio.Group>
                                <Radio value="1"> Tốt </Radio>
                                <Radio value="2"> Trung bình </Radio>
                                <Radio value="3"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn đánh giá của bạn.',
                                },
                            ]}
                            name="tutor_quality"
                            label="Người hỗ trợ buổi học có nhiệt tình không"
                        >
                            <Radio.Group>
                                <Radio value="1"> Tốt </Radio>
                                <Radio value="2"> Trung bình </Radio>
                                <Radio value="3"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đánh giá của bạn.',
                                },
                            ]}
                            name="understand"
                            label="Mức độ hiểu bài của bạn."
                        >
                            <Radio.Group>
                                <Radio value="100"> 100% </Radio>
                                <Radio value="75"> 75% </Radio>
                                <Radio value="50"> 50% </Radio>
                                <Radio value="25"> 25% </Radio>
                                <Radio value="0"> 0% </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    max: 255,
                                    message: 'Vui lòng nhập không quá 255 ký tự.',
                                },
                            ]}
                            name="message"
                            label="Bạn muốn nhắn nhủ thêm điều gì không?"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Form>
                    {!!errors && (
                        <div className="tw-text-red-500">{errors?.data?.message}</div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default FeedBack;
