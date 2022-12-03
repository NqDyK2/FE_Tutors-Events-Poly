import { Button, Form, Input, Modal, DatePicker, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { forwardRef, useImperativeHandle } from 'react'
import QuillEditor from '../../../../components/QuillEditor';

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
                className="tw-w-full -tw-mt-[70px] md:tw-w-3/5"
                okButtonProps={{
                    className:
                        ' tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
                }}
                cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
            >
                <Form>
                    <Form.Item
                        label="Tên sự kiện"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống tên sự kiện",
                            }
                        ]}
                    >
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
                    <Form.Item
                        name="content"
                        label="Nội dung: "
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập nội dung tóm tắt của buổi học.',

                            },

                            {
                                validator: (_, value) => {
                                    if (value?.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                                        return Promise.reject('Nội dung tóm tắt không được để trống');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]} >
                        <QuillEditor
                            // setFieldsValue={
                            //     (value) => {
                            //         formLesson.setFieldsValue({
                            //             content: value
                            //         })
                            //     }

                            // }
                            placeholder="Nhập nội dung tóm tắt của buổi học"
                        // initialValue={formLesson.getFieldValue('content')}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default forwardRef(FormEventsRef)