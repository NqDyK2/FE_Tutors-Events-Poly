import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, message, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React, { useState } from 'react';
import { useDeleteSubjectMutation, useGetAllSubjectQuery } from '../../../app/api/subjectApiSlice';
import AddCarrer from './ModalCarrer/AddCarrer';
import EditCarrer from './ModalCarrer/EditCarrer';
import { toast } from 'react-toastify';

import EditMajor from './ModalMajor/EditMajor';
import AddMajor from './ModalMajor/AddMajor';

import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';
import Spinner from '../../../components/Spinner';

const { Panel } = Collapse;
const MajorPage = () => {
    const { data, isLoading, error } = useGetAllSubjectQuery();
    const [deleteSubject, { isLoading: deleteLoading }] = useDeleteSubjectMutation();

    const onChange = (key) => {
        // console.log(key);
    };
    // pop confirm
    const confirm = (id) => {
        deleteSubject(id)
            .then(() => {
                toast.success('Xóa môn học thành công.');
            })
            .catch(() => {
                toast.error('Xóa không thành công.');
            })
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
                    <SettingOutlined />
                </Button>
            </Popover>
        </div>
    );
    const genCarrer = () => (
        <div>
            <Popover placement="left" content={contentPopverCarrers} title="Ngành học" trigger="click">
                <Button className='tw-border-none tw-bg-[#fafafa]'>
                    <SettingOutlined />
                </Button>
            </Popover>
        </div>
    );
    return (
        <>
            {isLoading && (

                <div className='tw-mt-[110px] tw-flex tw-justify-center'>
                    <Spinner tip={<p className='tw-text-orange-300 dark:tw-text-white'>Loading</p>} />
                </div>
            )}
            {error && <p>Lỗi!!!</p>}
            <>
                <AddCarrer />
            </>
            {
                data && data?.data?.map((item, index) => {
                    return <Collapse

                        onChange={onChange}
                        key={index}

                    >
                        <Panel header={`${item.name}`} key="1" extra={genCarrer()}>
                            {/* <div>
                                <AddMajor />
                            </div> */}
                            <div>
                                <AddSubject data={{ name: item.name, id: item.id }} />
                            </div>
                            {item.subjects?.map((subject, index) => {
                                return <>
                                    <div className='tw-flex tw-gap-4 tw-items-center tw-justify-between' key={index}>
                                        <div>
                                            <span className='tw-mt-2 tw-capitalize'>{subject.name}</span>
                                            <span className='tw-mt-2 tw-uppercase'> - {subject.code}</span>
                                        </div>
                                        <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1'>
                                            <EditSubject data={subject} />
                                            <div>
                                                <Popconfirm
                                                    title="Bạn có chắc muốn xóa ?"
                                                    onConfirm={() => confirm(subject.id)}
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
                                </>
                            })}
                        </Panel>
                    </Collapse>
                })
            }
        </>
    )
}

export default MajorPage