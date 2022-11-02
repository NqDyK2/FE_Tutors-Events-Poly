import { Table } from 'antd'
import React from 'react'
import { FaReply } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



const ListFeedback = () => {
    const navigate = useNavigate();
    let colums = [
        {
            title: "STT",
            dataIndex: 'key',
            key: 'key',
            width: '10%'
        },
        {
            title: "Nội dung",
            dataIndex: 'content',
            key: 'content',
        }
    ]

    const dataSource = [
        {
            key: '1',
            id: 1,
            content: 'Nội dung phản hồi ở đây',
        },
        {
            key: '2',
            id: 2,
            content: "Góp ý ở phần này",
        },
        {
            key: '3',
            id: 3,
            content: 'UI Gvien xem phản hồi, góp ý của sinh viên tham gia học.'
        }
    ]
    return (
        <>
            <div>
                <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
                    <span className="tw-text-[15px] dark:tw-text-white">
                        Hòm thư góp ý - Môn học: (Tên môn học ở đây)
                    </span>
                    <button
                        onClick={() => navigate(-1)}
                        className="tw-flex tw-items-center tw-text-blue-500 hover:tw-text-blue-700 hover:tw-bg-transparent"
                    >
                        <FaReply className="tw-mr-1" /> Trở lại
                    </button>
                </div>
                <Table
                    size='small'
                    scroll={{ y: 380 }}
                    dataSource={dataSource}
                    columns={colums}
                    pagination={false}
                // loading={{ indicator: <Spinner />, spinning: `Loading...` }}
                />
            </div>
        </>
    )
}

export default ListFeedback