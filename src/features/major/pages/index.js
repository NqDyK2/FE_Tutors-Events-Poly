import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Collapse, message, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React, { useState } from 'react';
import AddMajors from './ModalMajors/AddMajors';
import EditMajors from './ModalMajors/EditMajors';

import ModalAddSubject from './ModalSubject/ModalAddSubject';
import ModalEditSubject from './ModalSubject/ModalEditSubject';

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
    const contentPopver = (
        <div>
            <EditMajors />
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
    const genExtra = () => (
        <div>
            <Popover placement="left" content={contentPopver} title="Actions" trigger="click">
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
                    <Panel header="Công nghệ thông Tin" key="1" extra={genExtra()}>
                        <Collapse
                            onChange={onChange}
                            defaultActiveKey={['web']}
                            expandIconPosition={expandIconPosition}>
                            <Panel header="Thiết kế website" key="web" extra={genExtra()}>
                                <div className='tw-flex tw-gap-4 tw-items-center'>
                                    <span className='tw-mt-2'>- Xây dựng trang Web</span>
                                    <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                        <ModalEditSubject />
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
                                        <ModalEditSubject />
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
                                        <ModalEditSubject />
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
                                        <ModalEditSubject />
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
                                    <ModalAddSubject />
                                </div>
                            </Panel>
                            <Panel header="Ứng dụng phần mềm" extra={genExtra()}></Panel>
                            <Panel header="Lập trình máy tính" extra={genExtra()}></Panel>
                        </Collapse>
                    </Panel>
                </Collapse>

            </>
        </>
    )
}

export default MajorPage