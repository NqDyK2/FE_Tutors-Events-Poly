import { Button, Form, Input, Modal, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import './style.css'
const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT',
}

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};


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
                name="dynamic_form_item" {...formItemLayoutWithOutLabel}
            // onFinish={onFinish}
            >
                <Form.List
                    name="names"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 2) {
                                    return Promise.reject(new Error('At least 2 passengers'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Email giảng viên: ' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="Email"
                                            style={{
                                                width: '60%',
                                            }}
                                        />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button "
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{
                                        width: '60%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                                {/* <Button
                                    type="dashed"
                                    onClick={() => {
                                        add('The head item', 0);
                                    }}
                                    style={{
                                        width: '60%',
                                        marginTop: '20px',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field at head
                                </Button> */}
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>

            {/* <Form
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
            </div> */}
        </Modal >
    )
}

export default forwardRef(FormTeachersRef)