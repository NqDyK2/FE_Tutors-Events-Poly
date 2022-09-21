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
        width: 45,
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Ngày',
        dataIndex: 'ngay',
        width: 80,
        key: 'ngay',
    },
    {
        title: 'Phòng',
        dataIndex: 'phong',
        width: 80,
        key: 'phong',
    },
    {
        title: 'Giảng đường',
        dataIndex: 'giangduong',
        width: 80,
        key: 'giangduong',
    },
    {
        title: 'Mã môn',
        dataIndex: 'mamon',
        width: 80,
        key: 'mamon',
    },
    {
        title: 'Lớp',
        dataIndex: 'lop',
        width: 80,
        key: 'lop',
    },
    {
        title: 'Giảng viên',
        dataIndex: 'giangvien',
        width: 80,
        key: 'giangvien',
    },
    {
        title: 'Ca',
        dataIndex: 'ca',
        width: 45,
        key: 'ca',
    },
    {
        title: 'Thời gian',
        dataIndex: 'thoigian',
        width: 120,
        key: 'thoigian',
    },
    {
        title: 'Link học trực tuyến',
        dataIndex: 'link',
        key: 'link',
        width: 300,
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
        )
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

const CanlendarTutors = () => {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default CanlendarTutors