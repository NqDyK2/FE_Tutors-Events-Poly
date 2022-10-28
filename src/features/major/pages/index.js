import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
import React, { useState } from 'react';

import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';

const { Panel } = Collapse;
const MajorPage = () => {
    const [expandIconPosition, setExpandIconPosition] = useState('start');

    const onChange = (key) => {
        console.log(key);
    };
    const genExtra = () => (
        <SettingOutlined />
        // <div className='tw-flex tw-gap-3 tw-items-center tw-mt-1'>
        //     <AiOutlinePlusCircle />
        //     <EditOutlined />
        //     <ConfirmPopup
        //         content={
        //             <DeleteOutlined className="tw-mt-3" />
        //         }
        //         title={`Xác nhận xóa lớp học này?`}
        //         placement="boRight"
        //     />
        // </div>
    );
    return (
        <>
            <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={expandIconPosition}
            >
                <Panel header="Công nghệ thông Tin" key="1" extra={genExtra()}>
                    <Collapse
                        onChange={onChange}
                        defaultActiveKey={['web']}
                        expandIconPosition={expandIconPosition}>
                        <Panel header="Thiết kế website" key="web" extra={genExtra()}>
                            <div className='tw-flex tw-gap-4 tw-items-center'>
                                <span className='tw-mt-2'>- Xây dựng trang Web</span>
                                <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                    <a><EditOutlined className='tw-w-full' /></a>
                                    <a><DeleteOutlined className='tw-w-full tw-my-auto' /></a>
                                </div>
                            </div>
                            <br />
                            <div className='tw-flex tw-gap-4 tw-items-center'>
                                <span>- JavaScript</span>
                                <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                    <a><EditOutlined className='tw-w-full' /></a>
                                    <a><DeleteOutlined className='tw-w-full tw-my-auto' /></a>
                                </div>
                            </div>
                            <br />
                            <div className='tw-flex tw-gap-4 tw-items-center'>
                                <span>- PHP</span>
                                <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                    <a><EditOutlined className='tw-w-full' /></a>
                                    <a><DeleteOutlined className='tw-w-full tw-my-auto' /></a>
                                </div>
                            </div>
                            <br />
                            <div className='tw-flex tw-gap-4 tw-items-center'>
                                <span>- ReactJs</span>
                                <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                    <a><EditOutlined className='tw-w-full' /></a>
                                    <a><DeleteOutlined className='tw-w-full tw-my-auto' /></a>
                                </div>
                            </div>
                            <br />
                            <a className='tw-pl-3 tw-mt-5 tw-text-sm'>+ Thêm môn học...</a>
                        </Panel>
                        <Panel header="Ứng dụng phần mềm"></Panel>
                        <Panel header="Lập trình máy tính"></Panel>
                    </Collapse>
                </Panel>
            </Collapse>

        </>
    )
}

export default MajorPage