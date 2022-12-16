import { Form, Modal } from 'antd'
import React, { useState } from 'react'
import { useFeedbackEventMutation } from '../../../../app/api/eventApiSlice'
import QuillEditor from '../../../../components/QuillEditor'

const Feedback = ({ content }) => {
    const [addFb, { isLoading: loading }] = useFeedbackEventMutation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields();
    }
    const onFinish = (values) => {
        const data = {
            message
        }
    }
    return (
        <>
            <button
                onClick={showModal}
                className=' tw-mt-3 tw-h-9 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-mr-2 tw-mb-2 tw-w-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-cyan-500 tw-border-transparent tw-to-blue-500 tw-text-center  tw-text-sm tw-font-medium tw-text-white'
            >
                Phản hồi
            </button>
            <Modal>
                <Form>
                    <Form.Item
                        name="content"
                        label="Nội dung:"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập nội dung tóm tắt của buổi học.',

                            },
                            {
                                validator: (_, value) => {
                                    if (value?.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                                        return Promise.reject('Nội dung tóm tắt không được để trống');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]} >
                        <QuillEditor
                            setFieldsValue={
                                (value) => {
                                    form.setFieldsValue({
                                        content: value
                                    })
                                }

                            }
                            placeholder="Nội dung phản hồi"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Feedback