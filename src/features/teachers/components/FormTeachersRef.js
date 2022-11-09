import { Button, Form, Input, Modal} from 'antd';
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
                form={form}
                name="dynamic_form_item" {...formItemLayoutWithOutLabel}
                // onFinish={onFinish}
            >
                <Form.List
                    name="names"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Email: ' : ''}
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
                                                message: "Vui lòng nhập email của giảng viên.",
                                            },
                                            {
                                                type:'email',
                                                message: 'Địa chỉ email không đúng định dạng',
                                            }
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
                                        width: '100%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                        Thêm giảng viên
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal >
    )
}

export default forwardRef(FormTeachersRef)