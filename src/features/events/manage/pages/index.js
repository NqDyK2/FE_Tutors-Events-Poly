import { Button, Image, Space, Table, Tooltip } from 'antd'
import React, { useRef } from 'react'
import ConfirmPopup from '../../../../components/Confirm/ConfirmPopup'
import {
    EditOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import FormEventsRef from '../components/FormEventsRef';
import { useGetAllEventQuery } from '../../../../app/api/eventApiSlice';

const ManageEvent = () => {
    const modalEventRef = useRef();

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
            width: '10%',
        },
        {
            title: "Thứ - Ngày/Tháng",
            dataIndex: "date",
            key: "date",
            width: "10%",
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: "10%"
        },
        {
            title: "Ảnh sự kiện",
            data: "img",
            key: "img",
            render: (_, record) => (<Image preview={false} src={record.img} />)
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            width: "25%",
        },
        {
            title: "Số người tham gia",
            dataIndex: "amount",
            key: "amount",
            width: "15%",
            render: (_, record) => record.amount !== 0 ? (<span> {record.amount} </span>) : (<span className="tw-font-semibold tw-text-red-500">
                Chưa có
            </span>)
        },
        {
            title: "",
            key: "action",
            dataIndex: "action",
            width: "10%",
            render: () => (<div className="tw-flex tw-items-center tw-justify-end">
                <Tooltip
                    title="Thay đổi giảng viên phụ trách"
                    placement="top"
                    color={'#FF6D28'}
                >
                    <Space
                        size="middle"
                        className="tw-border-none tw-bg-transparent hover:tw-bg-transparent dark:tw-text-white"
                    >
                        <Button
                            className="tw-cursor-pointer tw-border-0 tw-bg-transparent tw-shadow-none hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink"
                            onClick={() => modalEventRef.current.show('EDIT')}
                        >
                            <EditOutlined />
                        </Button>
                    </Space>
                </Tooltip>
                <ConfirmPopup
                    // key={record.id}
                    className="tw-m-0"
                    content={
                        <Tooltip title="Xóa lớp học" placement="top" color={'#FF6D28'}>
                            <Button className="tw-border-0 tw-bg-transparent tw-pl-3 tw-shadow-none hover:tw-bg-transparent dark:tw-text-white dark:hover:tw-text-hoverLink">
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    }
                    title={`Xác nhận xóa sự kiện học này?`}
                    onConfirm={() => console.log("Remove")}
                    placement="topRight"
                />
            </div>)
        },
    ]
    let data = []
    const { data: res } = useGetAllEventQuery();
    if (res) {
        const dataSource = [

        ]
    }

    // `${item.start_time.slice(10, -3)} - ${item.end_time.slice(10,-3,)}`,



    return (
        <>
            <Helmet>
                <title>Sự kiện</title>
            </Helmet>

            <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
                <span className="tw-text-[15px] dark:tw-text-white">
                    Danh sách sự kiện
                </span>
                <div className="tw-flex tw-items-center tw-gap-x-3">
                    <>
                        <Button
                            icon={<PlusCircleOutlined />}
                            className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100 dark:hover:tw-text-blue-500"
                            type="link"
                            onClick={() => modalEventRef.current.show('ADD')}
                        >
                            Thêm sự kiện
                        </Button>
                    </>
                </div>
            </div>
            <Table
                columns={columns}
                scroll={{ y: 350 }}
                // dataSource={dataSource}
                pagination={false}
                size={'middle'}
            />
            <FormEventsRef ref={modalEventRef} />
        </>
    )
}

export default ManageEvent