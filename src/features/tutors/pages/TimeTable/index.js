import React, { useState } from 'react'
import { Space, Table, Tag, Button, Modal, Tooltip, Form, Input, Select, Checkbox, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
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
            render: (text) => <strong>{text}</strong>,
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
                    <span className='tw-cursor-pointer tw-text-blue-500'>
                        Chi tiết
                    </span>
                </Tooltip>
            ),
            width: 100
        },
        {
            title: '',
            dataIndex: 'phanhoi',
            key: 'phanhoi',
            render: (_, record) => (
                <span className='tw-cursor-pointer tw-text-blue-500'>
                    <span className='tw-cursor-pointer tw-text-blue-500' onClick={() => showModal()}>
                        Phản hồi về  buổi học.
                    </span>
                </span>
            ),
            width: 150
        },
    ];
    const data = [
        {
            stt: '1',
            key: 1,
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
            stt: '2',
            key: 2,
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
            stt: '3',
            key: 3,
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
            stt: '4',
            key: 4,
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
            stt: '5',
            key: 5,
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
            stt: '6',
            key: 6,
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
                key={data.key}
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
                        <Form.Item required name='qualitylesson' label="Bạn thấy chất lượng buổi học như thế nào?">
                            <Radio.Group>
                                <Radio value="good"> Tốt  </Radio>
                                <Radio value="medium"> Trung bình </Radio>
                                <Radio value="bad"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item required name='qualityteacher' label="Giảng viên hỗ trợ môn tốt không?">
                            <Radio.Group>
                                <Radio value="lgood"> Tốt  </Radio>
                                <Radio value="lmedium"> Trung bình </Radio>
                                <Radio value="lbad"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item required name='qualitytutor' label="Người hỗ trợ buổi học có nhiệt tình không">
                            <Radio.Group>
                                <Radio value="tugood"> Tốt  </Radio>
                                <Radio value="tumedium"> Trung bình </Radio>
                                <Radio value="tubad"> Yếu </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item required name='knowledgeDễ' label="Mức độ hiểu bài của bạn.">
                            <Radio.Group>
                                <Radio value="kgood"> 100%  </Radio>
                                <Radio value="kgood_medium"> 75% </Radio>
                                <Radio value="kmedium"> 50% </Radio>
                                <Radio value="kmedium_bad"> 25% </Radio>
                                <Radio value="kbad"> 0% </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='question' label="Bạn có câu hỏi gì giành cho buổi học sau không?">
                            <Input />
                        </Form.Item>
                        <Form.Item name='note' label="Bạn muốn nhắn nhủ thêm điều gì không?">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </div >
    )
}

export default TimeTable


{/* <Form.Item
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
                            <Checkbox.Group options={plainOptions} onChange={onChange} />
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
                                <Option value="1">Phải đấm</Option>
                                <Option value="2">Chắc chắn đấm</Option>
                                <Option value="3">Đấm bỏ mẹ thằng Đàm Minh Hiếu</Option>
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
                        </Form.Item> */}