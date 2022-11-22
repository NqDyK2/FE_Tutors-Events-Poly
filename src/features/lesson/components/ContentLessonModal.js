import { Modal } from 'antd';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ContentLessonModal = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <button
                onClick={showModal}
                className="tw-flex tw-cursor-pointer hover:tw-bg-transparent tw-border-none tw-text-[#1890ff]"
            >
                Nội dung
            </button>
            <Modal
                className='tw-top-5 tw-w-[500px]'
                title="Nội dung buổi học"
                open={isModalOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
                okText="Đóng"
                okButtonProps={{
                    className:
                        'tw-bg-gray-700 hover:tw-bg-gray-800 tw-border-none tw-rounded',
                }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div
                    className="ql-editor tw-p-0"
                >
                    {content}
                </div>
            </Modal>
        </div>
    );
};

export default ContentLessonModal;
