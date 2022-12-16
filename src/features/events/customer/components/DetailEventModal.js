import { Image, Modal } from 'antd';
import React, { useState } from 'react'
import parse from 'html-react-parser';
import { useCancelEventMutation, useJoinEventMutation } from '../../../../app/api/eventApiSlice';
import { toast } from 'react-toastify';
import CountdownTimer from '../../../../components/CountDownTimer';

const DetailEventModal = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const [joinEvent, { isLoading: loading }] = useJoinEventMutation();
  const [cancelEvent, { isLoading: load }] = useCancelEventMutation()
  const joinEve = (id) => {
    joinEvent(id).unwrap().then((res) => {
      toast.success(res.message)
      handleCancel()
    }).catch((err) => {
      toast.error(err.data.message)
    })
  }
  const cancelEve = (id) => {
    cancelEvent(id).unwrap().then((res) => {
      toast.success(res.message)
      handleCancel()
    }).catch((err) => {
      toast.error(err.data.message)
    })
  }
  return (
    <div >
      <Modal
        className="!tw-top-[40px]"
        // title="Ảnh sự kiện"
        open={isModalOpen}
        onOk={content.registered === 0 ? () => joinEve(content.id) : () => cancelEve(content.id)}
        okText={content.registered === 0 ? "Đăng ký tham gia" : "Huỷ đăng ký"}
        onCancel={handleCancel}
        okType="default"
        cancelText="Đóng"
        width={700}
        okButtonProps={content.registered === 0 ? {
          className:
            ' tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
        } : { className: 'tw-bg-red-500 hover:tw-bg-red-600 tw-text-slate-100 tw-border-none' }}
        cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}

      >
        <div className='tw-relative'>

          <Image preview={false} src={`${process.env.REACT_APP_API_URL}/${parse(content.image)}`} width="100%" />
          <div className='tw-absolute tw-top-1 tw-left-1  tw-flex tw-justify-center tw-items-center'>
            <CountdownTimer targetDate={content?.start_time} colorText="white" size='small' />
          </div>
        </div>
        {/* <div className="ql-editor tw-p-0">{parse(content)}</div> */}
        <h2 className='tw-text-center tw-text-2xl tw-mt-3'>
          {content.name}
        </h2>
        <span>
          {parse(content.content)}
        </span>
        <CountdownTimer targetDate={content.start_time} />
      </Modal>
      <button
        onClick={showModal}
        className='tw-h-9 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-mr-2 tw-mb-2 tw-w-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-cyan-500 tw-border-transparent tw-to-blue-500 tw-text-center  tw-text-sm tw-font-medium tw-text-white'
      >
        Xem chi tiết
      </button>
    </div>
  )
}

export default DetailEventModal