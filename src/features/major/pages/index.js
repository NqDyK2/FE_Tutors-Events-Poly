import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, message, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React from 'react';
import { toast } from 'react-toastify';
import { useDeleteMajorMutation } from '../../../app/api/MajorApiSlice';
import { useDeleteSubjectMutation, useGetAllSubjectQuery } from '../../../app/api/subjectApiSlice';
import Spinner from '../../../components/Spinner';
import AddMajor from './ModalMajor/AddMajor';
import EditMajor from './ModalMajor/EditMajor';
import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';

const { Panel } = Collapse;
const MajorPage = () => {
    const { data: dataSubject, isLoading, error } = useGetAllSubjectQuery();
    const [deleteSubject] = useDeleteSubjectMutation();
    const [deleteMajor] = useDeleteMajorMutation();
    const onChange = (key) => {
        console.log(key);
    };
    // pop confirm
    const removeSubject = (id) => {
        deleteSubject(id)
            .then(() => {
                toast.success('Xóa môn học thành công.');
            })
            .catch(() => {
                toast.error('Xóa không thành công.');
            })
    };
    const removeMajor = (id) => {
        deleteMajor(id)
            .then(() => {
                toast.success('Xóa chuyên ngành thành công.');
            })
            .catch(() => {
                toast.error('Xóa chuyên ss không thành công.');
            })
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    return (
        <>
            {isLoading && (

                <div className='tw-mt-[110px] tw-flex tw-justify-center'>
                    <Spinner tip={<p className='tw-text-orange-300 dark:tw-text-white'>Loading</p>} />
                </div>
            )}
            {error && <p>Lỗi!!!</p>}
            <>
                <AddMajor />
            </>
            {
                dataSubject && dataSubject?.data?.map((item, index) => {
                    return <Collapse
                        onChange={onChange}
                        key={index}
                    >
                        <Panel header={`${item.name}`} key="1" extra={
                            <Popover
                                placement="left"
                                title="Ngành học"
                                trigger="click"
                                content={
                                    <div>
                                        <EditMajor data={{ id: item.id, name: item.name }} />
                                        <div>
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn xóa ?"
                                                placement='left'
                                                onConfirm={() => removeMajor(item.id)}
                                                onCancel={cancel}
                                                okText="Xóa"
                                                cancelText="Không"

                                            >
                                                <a className='tw-text-red-500' href="#">Xóa ngành học</a>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                }
                            >
                                <Button className='tw-border-none tw-bg-[#fafafa]'>
                                    <SettingOutlined />
                                </Button>
                            </Popover>
                        }>
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
                                                    onConfirm={() => removeSubject(subject.id)}
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