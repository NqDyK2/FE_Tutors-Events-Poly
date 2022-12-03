import { Button, Form, Input, Modal, DatePicker, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { forwardRef, useImperativeHandle } from 'react'
import QuillEditor from '../../../../components/QuillEditor';
import { toast } from 'react-toastify';
import { useAddEventMutation } from '../../../../app/api/eventApiSlice';



const MODE = {
    ADD: 'ADD',
    EDIT: 'EDIT'
}
const { RangePicker } = DatePicker;

const FormEventsRef = (props, ref) => {

    const [form] = Form.useForm();
    const [antPics, setAntPics] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [typeOfEvent, setTypeOfLesson] = React.useState(1);
    const [title, setTitle] = React.useState('');
    const [mode, setMode] = React.useState(MODE.ADD);

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
                    start_time: data.date[0].format('YYYY-MM-DD HH:mm:00'),
                    end_time: data.date[1].format('YYYY-MM-DD HH:mm:00'),
                    image: data.img,
                }
                form.setFieldsValue(newData)
                setMode(MODE.EDIT);
            }
        },
        hide: () => {
            setVisible(false);
        }
    }))
    const handleAnt = e => {
        console.log(e.file.originFileObj.name);
        setAntPics(e.file.originFileObj);

    };
    // const { eventStartTime, eventEndTime } = props.timeEvent;
    const [AddEvent, { isLoading: eventLoading }] = useAddEventMutation()
    const onFinished = (values) => {
        let dataEvent = {
            name: values.name,
            location: values.location,
            content: values.content,
            start_time: values.date[0].format('YYYY-MM-DD HH:mm:00'),
            end_time: values.date[1].format('YYYY-MM-DD HH:mm:00'),
            image: values.img,
        }
        console.log(values);
        console.log(dataEvent);
        switch (mode) {
            case MODE.ADD:
                console.log(123);
                console.log(values);
                break;
            default:
        }
    }
    return (
        <>
            <Modal
                titte={title}
                forceRender
                open={visible}
                okType="default"
                // confirmLoading={addLoading || updateLoading}
                destroyOnClose
                okText="Lưu"
                onOK={() => { form.submit() }}
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
                    onChange={() => {
                        setError(null);
                    }}
                    layout="vertical"
                >
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
                    {/* <Form.Item
                        name="img"
                        label="Ảnh sự kiện"
                    // valuePropName="fileList"
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload.Dragger
                            multiple
                            onChange={handleAnt}
                            listType='picture'
                        // action={'http://localhost:3000/manage-events'}
                        // beforeUpload={(file) => {
                        //     console.log({ file });

                        //     return false
                        // }}
                        // {...propsImg} 
                        >
                            <Button icon={<UploadOutlined />}>Chọn hoặc kéo ảnh</Button>
                        </Upload.Dragger>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    )
}

export default forwardRef(FormEventsRef)