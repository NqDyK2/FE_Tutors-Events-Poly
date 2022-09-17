import React from 'react'
import { Table } from 'antd';
import { Button } from 'antd';

import { Switch } from 'antd';

const columns = [
    {
        title: '#',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Tên lớp',
        dataIndex: 'tenlop',// VIẾT BỪA THÔI BAO GIỜ ĐỔ DỮ LIỆU NHỚ SỬA NHÁ CÁC BẠN IU
        key: 'tenlop',
    },
    {
        title: 'Mã sinh viên',
        dataIndex: 'msv',
        key: 'msv',
    },
    {
        title: 'Tên sinh viên',
        dataIndex: 'namesv',
        key: 'namesv',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
        key: 'image',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: (_, record) => (
            <Switch
                className='tw-w-[80px]'
                checkedChildren='Có mặt'
                unCheckedChildren='Vắng'
                defaultChecked
            />
        ),
    },
    {
        title: 'Chú thích',
        dataIndex: 'desc',
        key: 'desc',
        render: (_, record) => (
            <input type='text' className='tw-w-[250px] tw-h-[30px] tw-border tw-border-[#DEE2E6] tw-rounded-[2px]' />
        ),
    },
];
const data = [
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
    {
        stt: '1',
        tenlop: 'WEB13605',
        msv: 'PH6969',
        namesv: 'Đàm Minh Híu',
        image: 'img nè',
    },
];

const AttendanceStudent = () => {
    return (
        <div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data} />
            <textarea
                className='tw-border tw-rounded-[5px] tw-mt-[15px] tw-pt-[5px] tw-pl-[5px]'
                placeholder='Ghi chú về buổi tutors'
                name=''
                rows='10'
                cols='162'
            />
            <Button type="primary" className='tw-w-full tw-h-[40px] tw-mt-[10px] tw-rounded-[5px] tw-bg-[#0DB27F]'>
                Lưu điểm danh
            </Button>
        </div>
    )
}

export default AttendanceStudent