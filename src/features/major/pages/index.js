import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Collapse, message, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React, { useState } from 'react';
import AddMajors from './ModalCarrer/AddCarrer';
import EditCarrer from './ModalCarrer/EditCarrer';
import EditMajor from './ModalMajor/EditMajor';

import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';

const { Panel } = Collapse;
const MajorPage = () => {
    const [expandIconPosition, setExpandIconPosition] = useState('start');

    const onChange = (key) => {
        console.log(key);
    };
    // pop confirm
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const contentPopverMajors = (
        <div>
            <EditMajor />
            <div>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa ?"
                    placement='left'
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Xóa"
                    cancelText="Không"
                >
                    <a className='tw-text-red-500' href="#">Xóa chuyên ngành</a>
                </Popconfirm>
            </div>
        </div>
    )
    const contentPopverCarrers = (
        <div>
            <EditCarrer />
            <div>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa ?"
                    placement='left'
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Xóa"
                    cancelText="Không"
                >
                    <a className='tw-text-red-500' href="#">Xóa ngành học</a>
                </Popconfirm>
            </div>
        </div>
    )
    const genMajor = () => (
        <div>
            <Popover placement="left" content={contentPopverMajors} title="Chuyên ngành" trigger="click">
                <Button className='tw-border-none tw-bg-[#fafafa]'>
                    <EditOutlined />
                </Button>
            </Popover>
        </div>
    );
    const genCarrer = () => (
        <div>
            <Popover placement="left" content={contentPopverCarrers} title="Ngành học" trigger="click">
                <Button className='tw-border-none tw-bg-[#fafafa]'>
                    <EditOutlined />
                </Button>
            </Popover>
        </div>
    );
    return (
        <>
            <>
                <AddMajors />
            </>
            <>
                <Collapse
                    defaultActiveKey={['1']}
                    onChange={onChange}
                >
                    <Panel header="Công nghệ thông Tin" key="1" extra={genCarrer()}>
                        <Collapse
                            onChange={onChange}
                            defaultActiveKey={['web']}
                            expandIconPosition={expandIconPosition}>
                            <Panel header="Thiết kế website" key="web" extra={genMajor()}>
                                <div className='tw-flex tw-gap-4 tw-items-center'>
                                    <span className='tw-mt-2'>- Xây dựng trang Web</span>
                                    <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                        <EditSubject />
                                        <div>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa ?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Xóa"
                                                cancelText="Không"
                                            >
                                                <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='tw-flex tw-gap-4 tw-items-center'>
                                    <span>- JavaScript</span>
                                    <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                        <EditSubject />
                                        <div>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa ?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Xóa"
                                                cancelText="Không"
                                            >
                                                <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='tw-flex tw-gap-4 tw-items-center'>
                                    <span>- PHP</span>
                                    <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                        <EditSubject />
                                        <div>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa ?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Xóa"
                                                cancelText="Không"
                                            >
                                                <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='tw-flex tw-gap-4 tw-items-center'>
                                    <span>- ReactJs</span>
                                    <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                        <EditSubject />
                                        <div>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa ?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Xóa"
                                                cancelText="Không"
                                            >
                                                <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <AddSubject />
                                </div>
                            </Panel>
                            <Panel header="Ứng dụng phần mềm" extra={genMajor()}></Panel>
                            <Panel header="Lập trình máy tính" extra={genMajor()}></Panel>
                        </Collapse>
                    </Panel>
                </Collapse>

            </>
        </>
    )
}

export default MajorPage