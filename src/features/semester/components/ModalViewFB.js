import { Modal, Tooltip } from 'antd';
import React, { useState } from 'react'
import { useGetAllFeedBackQuery } from '../../../app/api/semesterApiSlice'

const ModalViewFB = ({ id }) => {
    const { data, error, isLoading } = useGetAllFeedBackQuery(id.id)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <div>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
            >
                {
                    data && (data?.data?.map((item, index) => (
                        <div>
                            Giao diện phản hồi.
                        </div>
                    )))
                }
            </Modal>
            <Tooltip title="Xem phản hồi/góp ý của lớp" placement='topLeft' color={'#FF6D28'} >
                <div className='tw-cursor-pointer' onClick={showModal} >Xem phản hồi</div>
            </Tooltip>
        </div>
    )
}

export default ModalViewFB
