import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, message, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React from 'react';
import { useDeleteSubjectMutation, useGetAllSubjectQuery } from '../../../app/api/subjectApiSlice';
import AddCarrer from './ModalCarrer/AddCarrer';
import EditCarrer from './ModalCarrer/EditCarrer';
import { toast } from 'react-toastify';
import { useDeleteMajorMutation, useGetAllMajorQuery } from '../../../app/api/majorApiSlice';
import { useDeleteSubjectMutation } from '../../../app/api/subjectApiSlice';
import Spinner from '../../../components/Spinner';
import AddMajor from './ModalMajor/AddMajor';
import EditMajor from './ModalMajor/EditMajor';
import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';
import Spinner from '../../../components/Spinner';

const { Panel } = Collapse;
const MajorPage = () => {
    const { data: dataSubject, isLoading, error } = useGetAllMajorQuery();
    const [deleteSubject] = useDeleteSubjectMutation();
    const [deleteMajor] = useDeleteMajorMutation();
    // pop confirm
    const confirm = (id) => {
        deleteSubject(id)
            .then((res) => {
                toast.success(res.message);
            })
            .catch((err) => {
                toast.error('Xóa không thành công.');
            })
    };
    const removeMajor = (id) => {
        deleteMajor(id)
            .then((res) => {
                toast.success(res.message);
            })
            .catch(() => {
                toast.error('Xóa chuyên không thành công.');
            })
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
                <AddCarrer />
            </>
            {
                dataSubject && dataSubject?.data?.map((major, index) => {
                    return <Collapse
                        key={index}
                        className="tw-pl-3 tw-text-sm tw-ml-4"
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
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn xóa ?"
                                                placement='left'
                                                onConfirm={() => removeMajor(major.id)}
                                                okText="Xóa"
                                                cancelText="Không"
                                            >
                                                <a className='tw-text-red-500' href="#">Xóa chuyên ngành</a>
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
                            <AddSubject data={{ name: major.name, id: major.id }} />
                            {major?.subjects?.map((subject, index) => {
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