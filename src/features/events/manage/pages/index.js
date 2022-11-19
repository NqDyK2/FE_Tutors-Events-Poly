import { Button, Image, Space, Table, Tooltip } from 'antd'
import React, { useRef } from 'react'
import ConfirmPopup from '../../../../components/Confirm/ConfirmPopup'
import {
    EditOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import img1 from "../../../../assets/images/B1.jpg";
import img2 from "../../../../assets/images/B2.jpg";
import FormEventsRef from '../components/FormEventsRef';

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
            width: '20%',
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
            title: "Ảnh",
            data: "img",
            key: "img",
            render: (_, record) => (<Image src={record.img} />)
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            width: "25%",
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

    const dataSource = [
        {
            stt: 1,
            key: 1,
            name: "Sự kiện Chào mừng ngày Nhà Giáo Việt Nam.",
            date: "Thứ Bảy - 19/11/2022",
            time: "00:00:00 - 23:59:00",
            img: img1,
            content: 'Meeting văn nghệ ngày Nhà Giáo Việt Nam'
        },
        {
            stt: 2,
            key: 2,
            name: "Sự kiện Chào mừng ngày Nhà Giáo Việt Nam.",
            date: "Thứ Bảy - 20/11/2022",
            time: "00:00:00 - 23:59:00",
            img: img2,
            content: 'Meeting văn nghệ ngày Nhà Giáo Việt Nam dfsgfgsdrgsdfbvxvbxfgsdgresawefgsfdgsrdfbxfvsdfgdfgb'
        }
    ]

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
                dataSource={dataSource}
                pagination={false}
                size={'middle'}
            />
            <FormEventsRef ref={modalEventRef} />
        </>
    )
}

export default ManageEvent