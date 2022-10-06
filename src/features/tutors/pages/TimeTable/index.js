import React, { useState } from 'react'
import { Space, Table, Tag, Button, Modal, Tooltip } from 'antd';

const text = <span>
    HIẾU ĐÀM YÊU BÀ XÃ RẤT NHIỀU
</span>;

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Ngày',
        dataIndex: 'ngay',
        key: 'ngay',
    },
    {
        title: 'Phòng',
        dataIndex: 'phong',
        key: 'phong',
    },
    {
        title: 'Giảng đường',
        dataIndex: 'giangduong',
        key: 'giangduong',
    },
    {
        title: 'Mã môn',
        dataIndex: 'mamon',
        key: 'mamon',
    },
    {
        title: 'Lớp',
        dataIndex: 'lop',
        key: 'lop',
    },
    {
        title: 'Giảng viên',
        dataIndex: 'giangvien',
        key: 'giangvien',
    },
    {
        title: 'Ca',
        dataIndex: 'ca',
        key: 'ca',
    },
    {
        title: 'Thời gian',
        dataIndex: 'thoigian',
        key: 'thoigian',
    },
    {
        title: 'Link học trực tuyến',
        dataIndex: 'link',
        key: 'link',
        render: (_, record) => (
            <a href={record.link}>
                {record.link}
            </a>
        ),
    },
    {
        title: 'Chi tiết',
        dataIndex: 'chitiet',
        key: 'chitiet',
        render: (_, record) => (
            <Tooltip placement="left" title={text} color={'orange'} >
                <p className='tw-cursor-pointer tw-text-blue-500'>
                    Chi tiết
                </p>
            </Tooltip>
        ),
        width: 100
    },
    {
        title: '',
        dataIndex: 'phanhoi',
        key: 'phanhoi',
        render: (_, record) => (
                <p className='tw-cursor-pointer tw-text-blue-500'>
                    Phản hồi về  buổi học.
                </p>
        ),
        width: 150
    },
];
const data = [
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
    },
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: '',
    },
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
    },
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: '',
    },
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: '',
    },
    {
        stt: '1',
        ngay: 'Thứ Ba 09/08/2022',
        phong: 'Google Meet 2',
        giangduong: 'Google Meet',
        mamon: 'SYB3011',
        mon: 'Khởi sự doanh nghiệp',
        lop: 'WEB16305',
        giangvien: 'datlt34',
        ca: '4',
        thoigian: '09:25 - 11:25',
        link: 'https://meet.google.com/cft-atfc-ybb?pli=1&authuser=1',
    },

];

const TimeTable = () => {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    )
}

export default TimeTable