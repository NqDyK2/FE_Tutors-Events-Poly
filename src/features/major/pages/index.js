import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, message, Table, Popconfirm, Popover, Tooltip } from 'antd';
import { Button } from 'antd/lib/radio';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useGetAllMajorQuery, useDeleteMajorMutation } from '../../../app/api/majorApiSlice';
import { useDeleteSubjectMutation } from '../../../app/api/subjectApiSlice';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';
import Spinner from '../../../components/Spinner';
import AddMajor from './ModalMajor/AddMajor';
import EditMajor from './ModalMajor/EditMajor';
import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';

const { Panel } = Collapse;

const MajorPage = () => {
    const { data: dataSubject, isLoading, error } = useGetAllMajorQuery();
    const [deleteSubject] = useDeleteSubjectMutation();
    const [deleteMajor] = useDeleteMajorMutation();
    // colums table
    const columns = [
        {
            title: 'Mã môn',
            dataIndex: 'code',
            key: 'code',
            render: (subject_code, record) => (
                <div className="tw-uppercase">{subject_code}</div>
            ),
        },
        {
            title: 'Tên môn học',
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
                        <ConfirmPopup content={
                            <Button className="dark:tw-text-white tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent">
                                <Tooltip title="Xóa môn học" color='#FF6D28'>

                                    <DeleteOutlined style={{ color: 'red' }} className='tw-w-full tw-my-auto' />
                                </Tooltip>
                            </Button>
                        }
                            title="Bạn muốn xóa môn học này?"
                            onConfirm={() => removeSubject(record.id)}
                        />
                    </div>
                </div>

            ),
        },
    ];
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
            <Helmet>
                <title>Chuyên ngành - môn học</title>
            </Helmet>
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
                        className="tw-pl-3 tw-text-sm tw-ml-4 dark:tw-bg-[#202125] tw-border-transparent"
                    >
                        <Panel className='tw-text-lg' showArrow={false} header={<Tooltip title="Ấn để  xem môn học trong danh sách hỗ trợ" color='#FF6D28'><span className='dark:tw-text-white'> {major.name} </span></Tooltip>} key="1" extra={
                            <Popover
                                placement="left"
                                trigger="click"
                                className='dark:tw-bg-[#202125] dark:tw-text-white dark:hover:tw-text-blue-400'
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
                            <AddSubject className="hover:tw-text-color-200 dark:tw-bg-[#202125]" data={{ name: major.name, id: major.id }} />
                            <Table
                                className='tw-mt-4'
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