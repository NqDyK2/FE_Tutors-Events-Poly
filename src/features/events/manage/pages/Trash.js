import { Button, Space, Table, Tooltip } from 'antd';
import React from 'react'
import { FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GiBackwardTime } from "react-icons/gi"
import { timeFormat } from '../../../../utils/TimeFormat';
import { useGetAllTrashEventQuery } from '../../../../app/api/eventApiSlice';
import ContentEventModal from '../components/ContentEventModal';
import ImageEventViewModal from '../components/ImageEventViewModal';
import Spinner from '../../../../components/Spinner';

const Trash = () => {
    const navigate = useNavigate();
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: '5%',
        },
        {
            title: "Tên sự kiện",
            dataIndex: "name",
            key: "name",
            width: '15%',
        },
        {
            title: "Thứ - Ngày/Tháng",
            dataIndex: "date",
            key: "date",
            width: "15%",
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: "10%",
        },
        {
            title: "Nơi diễn ra sự kiện",
            dataIndex: "location",
            key: "location",
            width: "13%",
        },
        {
            title: "Ảnh sự kiện",
            data: "img",
            key: "img",
            width: "10%",
            render: (_, record) => (<ImageEventViewModal content={record.img} />)
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            width: "10%",
            render: (_, record) => (
                <ContentEventModal content={record.content ? record.content : "Không có nội dung"} />
            )
        },
        {
            title: "Số người tham gia",
            dataIndex: "amount",
            key: "amount",
            width: "13%",
            render: (_, record) => record.amount !== 0 ? (<span> {record.amount} </span>) : (<span className="tw-font-semibold tw-text-red-500">
                Chưa có
            </span>)
        },
        {
            title: "",
            key: "action",
            dataIndex: "action",
            width: "7%",
            render: (_, record) => (
                <Tooltip
                    title="Khôi phục sự kiện"
                    placement="top"
                    color={'#FF6D28'}

                >
                    <GiBackwardTime className='tw-cursor-pointer tw-text-center hover:tw-text-orange-600' />
                </Tooltip>
            )
        },
    ]
    let data = []
    const { data: res, isLoading: eventsLoading } = useGetAllTrashEventQuery();
    if (res) {
        data = res.data.map((item, index) => {
            return {
                key: index,
                stt: index + 1,
                id: item.id,
                date: timeFormat(item.start_time.split('')[0]),
                time: `${item.start_time.slice(10, -3)} - ${item.end_time.slice(
                    10,
                    -3,
                )}`,
                name: item.name,
                img: item.image,
                content: item.content,
                location: item.location,
                amount: item.event_users_count,
            }
        })
    }

    return (
        <>
            <div className="tw-flex tw-justify-between tw-gap-x-3">
                <span className="tw-text-[15px] dark:tw-text-white">
                    Thùng rác
                </span>
                <Button
                    onClick={() => navigate(-1)}
                    className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
                >
                    <FaReply className="tw-mr-1" /> Trở lại
                </Button>
            </div>
            <Table

                columns={columns}
                scroll={{ y: 350 }}
                dataSource={data}
                pagination={false}
                size={'middle'}
                loading={{
                    indicator: <Spinner />,
                    spinning: eventsLoading
                }}
            />
        </>
    )
}

export default Trash