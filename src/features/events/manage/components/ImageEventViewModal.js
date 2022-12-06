import { Image, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';

const ImageEventViewModal = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Tooltip title="Xem ảnh đại diện sự kiện" color="#FF6D28">
                <button
                    onClick={showModal}
                    className="tw-flex tw-cursor-pointer tw-border-none tw-text-[#1890ff] hover:tw-bg-transparent"
                >
                    Xem ảnh
                </button>
            </Tooltip>
            <Modal
                className="!tw-top-[40px]"
                // title="Ảnh sự kiện"
                open={isModalOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
                okText="Đóng"
                width={750}
                okButtonProps={{
                    className:
                        'tw-bg-gray-700 hover:tw-bg-gray-800 tw-border-none tw-rounded',
                }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Image preview={false} src={parse(content)} />
                {/* <div className="ql-editor tw-p-0">{parse(content)}</div> */}
            </Modal>
        </div>
    );
};

export default ImageEventViewModal;
