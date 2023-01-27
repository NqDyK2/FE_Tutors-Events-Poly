import { Button, Form, Input, Modal, DatePicker, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { forwardRef, useImperativeHandle } from 'react'
import QuillEditor from '../../../../components/QuillEditor';
import { toast } from 'react-toastify';
import { useAddEventMutation, useUpdateEventMutation } from '../../../../app/api/eventApiSlice';
import moment from 'moment';



const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT'
}
const { RangePicker } = DatePicker;

const FormEventsRef = (props, ref) => {


    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [typeOfEvent, setTypeOfLesson] = React.useState(1);
    const [title, setTitle] = React.useState('');
    const [mode, setMode] = React.useState(MODE.ADD);
    const [appImg, setAppImg] = React.useState(null);
    useImperativeHandle(ref, () => ({
        show: (caseForm, data) => {
            setVisible(true);
            if (caseForm === MODE.ADD) {
                setTitle('Thêm sự kiện');
                setMode(MODE.ADD);
            } else {
                setTitle('Sửa sự kiện');
                let newData = {
                    name: data.name,
                    location: data.location,
                    content: data.content,
                    date: [moment(data.start_time), moment(data.end_time)],
                    start_time: data.start_time,
                    end_time: data.end_time,
                    // start_time: data.date[0].format('YYYY-MM-DD HH:mm:00'),
                    // end_time: data.date[1].format('YYYY-MM-DD HH:mm:00'),
                    image: data.img,
                    eventId: data.id,
                }
                form.setFieldsValue(newData)
                setMode(MODE.EDIT);
            }
        },
        hide: () => {
            setVisible(false);
        }
    }))

    // const { eventStartTime, eventEndTime } = props.timeEvent;
    const uploadImage = async e => {
        const files = e.target.files[0];
        setAppImg(files)
        // const data = new FormData()
        // data.append('image', files[0])
        // data.append('upload_preset', 'darwin')
    }
    const [UpdateEvent, { isLoading: Loading }] = useUpdateEventMutation();
    const [AddEvent, { isLoading: eventLoading, error: eventError }] = useAddEventMutation()
    const onFinished = (values) => {

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('location', values.location)
        formData.append('content', values.content)
        formData.append('type', 1)
        formData.append('start_time', values.date[0].format('YYYY-MM-DD HH:mm:00'))
        formData.append('end_time', values.date[1].format('YYYY-MM-DD HH:mm:00'))
        formData.append('image', appImg)
        switch (mode) {
            case MODE.ADD:
                AddEvent(formData).unwrap().then((res) => {
                    setVisible(false)
                    form.resetFields();
                    setError(null);
                    toast.success(res.message);
                }).catch((error) => {
                    setError(error.data);
                })
                break;
            case MODE.EDIT:
                UpdateEvent([values.eventId, formData])
                    .unwrap().then((res) => {
                        setVisible(false);
                        form.resetFields();
                        setError(null);
                        toast.success(res.message);
                    })
                    .catch((err) => {
                        setError(err.data)
                    });
                break;
            default:
        }
    }
    return (
        <>
            <Modal
                title={title}
                forceRender
                open={visible}
                okType="default"
                confirmLoading={Loading || eventLoading}
                destroyOnClose
                okText="Lưu"
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setVisible(false);
                    setError(null);
                    form.resetFields();
                }}
                className="tw-w-full -tw-mt-[70px] md:tw-w-3/5"
                okButtonProps={{
                    className:
                        ' tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
                }}
                cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
                getContainer={false}
            >
                <Form
                    form={form}
                    preserve={false}
                    onFinish={onFinished}
                    onFinishFailed={(e) => {
                    }}
                    onChange={() => {
                        setError(null);
                    }}
                    layout="vertical"
                    encType='multipart/form-data'
                >
                    <Form.Item className="tw-hidden" name="eventId">
                        <Input hidden />
                    </Form.Item>
                    <Form.Item
                        label="Tên sự kiện"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống tên sự kiện",
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="tw-flex tw-items-center tw-justify-between">

                        <Form.Item
                            className="tw-w-[48%]"
                            name="location"
                            label="Nơi diễn ra sự kiện"
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
                            <RangePicker
                                className="tw-w-full"
                                // defaultPickerValue={
                                //     moment(eventStartTime) >= moment()
                                //         ? moment(eventStartTime)
                                //         : moment().add(1, 'day')
                                // }
                                placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
                                showTime
                                allowClear
                                // defaultPickerValue={}
                                format={'DD/MM/YYYY HH:mm'}
                                // disabledDate={(current) => {
                                //     const startDate = moment(eventStartTime);
                                //     const endDate = moment(eventEndTime);
                                //     return (
                                //         current &&
                                //         (current < startDate ||
                                //             current > endDate ||
                                //             current < moment())
                                //     );
                                // }}
                                showSecond={false}
                                order={true} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="content"
                        label="Nội dung:"
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
                            setFieldsValue={
                                (value) => {
                                    form.setFieldsValue({
                                        content: value
                                    })
                                }

                            }
                            placeholder="Nhập nội dung sự kiện"
                            initialValue={form.getFieldValue('content')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Ảnh sự kiện"
                    // valuePropName="fileList"
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Input type='file' name="file" onChange={uploadImage} />
                    </Form.Item>
                </Form>
                <div>
                    {error && (
                        <p>
                            <span className="tw-text-red-500 tw-font-semibold tw-mr-2">
                                {error.message || error.data.message || error.data || 'Lỗi không xác định'}
                            </span>
                        </p>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default forwardRef(FormEventsRef)