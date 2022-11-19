import { Button, Form, Input, Modal, DatePicker, Upload } from 'antd'
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import React, { forwardRef, useImperativeHandle } from 'react'

const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT'
}

const FormEventsRef = (props, ref) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [error, setErrir] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [mode, setMode] = React.useState(MODE.ADD);
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    useImperativeHandle(ref, () => ({
        show: (caseForm, data) => {
            setVisible(true);
            if (caseForm === MODE.ADD) {
                setTitle('Thêm sự kiện');
                setMode(MODE.ADD);
            } else {
                setTitle('Sửa sự kiện');
                setMode(MODE.EDIT);
            }
        },
        hide: () => {
            setVisible(false);
        }
    }))
    return (
        <>
            <Modal
                titte={title}
                open={visible}
                okType="default"
                destroyOnClose
                okText="Lưu"
                getContainer={false}
                onOK={() => console.log("Ok Button")}
                onCancel={() => {
                    setVisible(false);
                }}
                okButtonProps={{
                    className:
                        'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
                }}
                cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
            >
                <Form>
                    <Form.Item label="Tên sự kiện">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="tw-w-[48%]"
                        label="Thời gian:"
                        name={'date'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập thời gian',
                            },
                        ]}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="Ảnh"
                        valuePropName="fileList"
                        extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Nội dung">
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default forwardRef(FormEventsRef)