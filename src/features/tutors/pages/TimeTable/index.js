import React, { useState } from 'react'
import { Space, Table, Tag, Button, Modal, Tooltip, Form, Input, Select, Checkbox } from 'antd';
const { Option } = Select;

const text = <span>
    HIẾU ĐÀM YÊU BÀ XÃ RẤT NHIỀU
</span>;

const TimeTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    // check box
    const plainOptions = ['Tốt', 'Trung bình', 'Chưa tốt'];
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    // table antd
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
                    <p className='tw-cursor-pointer tw-text-blue-500' onClick={() => showModal()}>
                        Phản hồi về  buổi học.
                    </p>
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

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            {/* box modal */}
            <Modal
                title="Phản hồi buổi học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Gửi phản hồi"
            >
                <div>
                    <Form
                        form={form}
                        initialValues={{
                            phanhoigv: '',
                            phanhoitutor: '',
                            chatluongbuoihoc: '',
                            muondamDamMinhHieuKhong: '',
                            ykiendonggop: ''
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label='Phản hồi giáo viên'
                            name='phanhoigv'
                            rules={[{
                                required: true,
                            }]}
                        >
                            <Select
                                onChange={handleChange}
                            >
                                <Option value="gioi">Giỏi</Option>
                                <Option value="trungbinh">Trung bình</Option>
                                <Option value="yeu">Yếu</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Phản hồi tutor'
                            name='phanhoitutor'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label='Chất lượng buổi học'
                            name='chatluongbuoihoc'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Bạn có muốn đấm Đàm Minh Hiếu'
                            name='muondamDamMinhHieuKhong'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Select
                                onChange={handleChange}
                                allowClear
                            >
                                <Option value="gioi">Phải đấm</Option>
                                <Option value="trungbinh">Chắc chắn đấm</Option>
                                <Option value="yeu">Đấm bỏ mẹ thằng Đàm Minh Hiếu</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Ý kiến đóng góp'
                            name='ykiendonggop'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </div >
    )
}

export default TimeTable