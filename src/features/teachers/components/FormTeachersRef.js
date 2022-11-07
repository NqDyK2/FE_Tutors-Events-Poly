import { Form, Input, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import './style.css'
const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT',
}



const FormTeachersRef = ({ semester_id }, ref) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [mode, setMode] = useState(MODE.ADD);

    useImperativeHandle(ref, () => ({
        show: (caseForm, data) => {
            form.setFieldValue({ semester_id });
            setVisible(true);
            if (caseForm === MODE.ADD) {
                setTitle('Thêm giảng viên');
            } else {
                setTitle('Sửa giảng viên');
                setMode(MODE.EDIT);
                // form.setFieldsValue({
                // id: data.id
                // })
            }
        },
        hide: () => {
            setVisible(false);
        }
    }));

    // const onFinish = (values) => {
    //     const dataRequest = {

    // }
    // switch (mode) {
    //     case MODE.ADD:
    //         break;
    //     case MODEODE.EDIT:
    //         break;
    //     default:
    // }
    return (
        <Modal title={title} open={visible} okType="default" destroyOnClose okText="Lưu" getContainer={false}
            // confirmLoading={addLoading || updateLoading}
            onCancel={() => {
                setVisible(false);
                setError(null);
                form.resetFields();
            }}
            okButtonProps={{
                className:
                    'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
            }}
            cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
        >
            <Form
                form={form}
                // onFinish={onFinish}onFinish
                layout="vertical"
                onChange={() => {
                    setError(null);
                }}
            >
                <Form.Item label="Họ Và Tên:">
                    <Input />
                </Form.Item>
                <Form.Item label="Email:">
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại:">
                    <Input />
                </Form.Item>
            </Form>
            <div>
                {error && <div className='tw-text-red-500'>Chỗ này để điền message</div>}
            </div>
        </Modal>
    )
}

export default forwardRef(FormTeachersRef)