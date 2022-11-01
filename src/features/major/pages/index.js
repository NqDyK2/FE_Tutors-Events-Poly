import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, message, Table, Popconfirm, Popover } from 'antd';
import { Button } from 'antd/lib/radio';
import React from 'react';
import { toast } from 'react-toastify';
import { useGetAllMajorQuery, useDeleteMajorMutation } from '../../../app/api/majorApiSlice';
import { useDeleteSubjectMutation } from '../../../app/api/subjectApiSlice';
import Spinner from '../../../components/Spinner';
import AddMajor from './ModalMajor/AddMajor';
import EditMajor from './ModalMajor/EditMajor';
import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';

const { Panel } = Collapse;
const columns = [
    {
        dataIndex: 'code',
        key: 'code',
    },
    {
        dataIndex: 'name',
        key: 'name',
    },
    {
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
            <div className='tw-flex tw-gap-2 tw-items-center tw-mb-1 tw-float-right'>
                <EditSubject data={record} />
                <div>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa ?"
                        onConfirm={() => record.action.removeSubject(record.id)}
                        okText="Xóa"
                        cancelText="Không"
                    >
                        <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                    </Popconfirm>
                </div>
            </div>

        ),
    },
];
const MajorPage = () => {
    const { data: dataSubject, isLoading, error } = useGetAllMajorQuery();
    const [deleteSubject] = useDeleteSubjectMutation();
    const [deleteMajor] = useDeleteMajorMutation();
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
    return (
        <>
            {isLoading && (

                <div className='tw-mt-[110px] tw-flex tw-justify-center'>
                    <Spinner tip={<p className='tw-text-orange-300 dark:tw-text-white'>Loading</p>} />
                </div>
            )}
            <AddMajor />
            {error && (
                <div>
                    <p className='tw-font-medium tw-text-red-500'>
                        {error?.response?.data?.message ||
                            error?.data?.message ||
                            error?.message ||
                            'Đã có lỗi xảy ra!'}
                    </p>
                </div>
            )}
            {
                dataSubject && dataSubject?.data?.map((major) => {
                    return <Collapse
                        key={'m' + major.id}
                        className="tw-pl-3 tw-text-sm tw-ml-4"
                    >
                        <Panel header={`${major.name}`} key="1" extra={
                            <Popover
                                placement="left"
                                trigger="click"
                                content={
                                    <div>
                                        <EditMajor data={{ id: major.id, name: major.name }} />
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
                            <Table
                                key={major.subjects.key}
                                columns={columns}
                                dataSource={major.subjects}
                                pagination={false}
                              />
                        </Panel>
                    </Collapse>
                })
            }
        </>
    )
}

export default MajorPage