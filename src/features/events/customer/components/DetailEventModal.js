import { Image, Modal } from 'antd';
import React, { useState } from 'react'
import parse from 'html-react-parser';
import { useJoinEventMutation } from '../../../../app/api/eventApiSlice';
import { toast } from 'react-toastify';

const DetailEventModal = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const [joinEvent, { isLoading: loading }] = useJoinEventMutation();
  const submit = (id) => {
    joinEvent(id).unwrap().then((res) => {
      toast.success(res)
      console.log(res);
    }).catch((err) => {
      toast.error(err)
    })
  }
  return (
    <>
      <Modal
        className="!tw-top-[40px]"
        // title="Ảnh sự kiện"
        open={isModalOpen}
        onOk={() => submit(content.id)}
        onCancel={handleCancel}
        okText="Đăng ký tham gia"
        okType="default"
        cancelText="Đóng"
        width={750}
        okButtonProps={{
          className:
            ' tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
        }}
        cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}

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