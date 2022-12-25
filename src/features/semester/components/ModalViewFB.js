import { Modal, Tooltip, Table } from 'antd';
import React, { useState } from 'react'
import { useGetAllFeedBackQuery } from '../../../app/api/semesterApiSlice'
import Spinner from '../../../components/Spinner';

const ModalViewFB = ({ id }) => {
    const { data, error, isLoading } = useGetAllFeedBackQuery(id.id)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    let mesageColumns = [
        {
            title: 'Nhận xét của sinh viên',
            key: 'message',
            render: (message, record) => (
                <>
                    <div>{record?.message}</div>
                </>
            ),
        },
    ];

    return (
        <div>
            <Modal
                title="Phản hồi về lớp học"
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <div>
                    <div className='tw-flex tw-justify-between'>
                        <p><b>Giảng viên: </b></p>
                        <span>Tốt: {data?.data?.filter(item => item.teacher_quality === 1).length}</span>
                        <span>Trung bình: {data?.data?.filter(item => item.teacher_quality === 2).length}</span>
                        <span>Chưa tốt: {data?.data?.filter(item => item.teacher_quality === 3).length}</span>
                    </div>
                    <div className='tw-flex tw-justify-between'>
                        <p><b>Trợ giảng: </b></p>
                        <span>Tốt: {data?.data?.filter(item => item.tutor_quality === 1).length}</span>
                        <span>Trung bình: {data?.data?.filter(item => item.tutor_quality === 2).length}</span>
                        <span>Chưa tốt: {data?.data?.filter(item => item.tutor_quality === 3).length}</span>
                    </div>
                    <p className='tw-mb-7'><b>Mức độ hiểu bài trung bình: </b>{data?.data?.filter(item => item.tutor_quality === 3).length / data?.data?.length * 100}%</p>
                </div>
                <div>
                    <Table
                        loading={{
                            indicator: <Spinner />,
                            spinning: isLoading,
                        }}
                        pagination={true}
                        columns={mesageColumns}
                        dataSource={data?.data}
                        tableLayout="auto"
                        rowKey={data?.data?.id}
                        className="attendance-table tw-border-[1px] tw-border-[#f0f0f0] tw-border-b-0"
                        scroll={{
                            y: 400,
                            x: 400
                        }}
                    />
                </div>
            </Modal>
            <Tooltip title="Xem phản hồi/góp ý của lớp" placement='topLeft' color={'#FF6D28'} >
                <div className='tw-cursor-pointer hover:tw-color-blue-500' onClick={showModal} >Xem phản hồi</div>
            </Tooltip>
        </div>
    )
}

export default ModalViewFB
