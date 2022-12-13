import { Image, Modal } from 'antd';
import React, { useState } from 'react'
import parse from 'html-react-parser';

const DetailEventModal = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  console.log(content);
  return (
    <>
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
        <Image preview={false} src={`${process.env.REACT_APP_API_URL}/${parse(content.image)}`} width="100%" />
        {/* <div className="ql-editor tw-p-0">{parse(content)}</div> */}
        <h2 className='tw-text-center tw-text-2xl tw-mt-3'>
          {content.name}
        </h2>
        <span>
          {parse(content.content)}
        </span>
      </Modal>
      <button
        onClick={showModal}
        className=' tw-mt-3 tw-h-9 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-mr-2 tw-mb-2 tw-w-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-cyan-500 tw-border-transparent tw-to-blue-500 tw-text-center  tw-text-sm tw-font-medium tw-text-white'
      >
        Xem chi tiết
      </button>
    </>
  )
}

export default DetailEventModal