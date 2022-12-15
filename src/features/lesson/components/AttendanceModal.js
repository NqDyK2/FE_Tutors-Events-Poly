import { Button, Modal, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import { useGetAttendanceLessonListStudentQuery } from '../../../app/api/attendanceApiSlice';
import { useInViteClassMutation } from '../../../app/api/studentApiSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';

const AttendanceModal = ({ content, lessonId, subjectName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skip, setSkip] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [inviteStudenttoClass] = useInViteClassMutation();
    const { data, isLoading, error } = useGetAttendanceLessonListStudentQuery(
        lessonId
    );
    const handleInviteStudent = ({ student_email }) => {
        inviteStudenttoClass({
            student_email,
            lesson_id: lessonId,
        })
            .unwrap()
            .then((res) => {
                setSkip(new Date().getTime())
                toast.success(res.message);
            })
            .catch((err) => {
                setSkip(new Date().getTime())
                toast.error(err.data?.message || 'Có lỗi xảy ra.');
            });
    };

    let columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Sinh viên',
            key: 'studentName',
            render: (_, record) => (
                <>
                    {record.is_warning === 0 ? (
                        <Tag color="success">{record.studentName}</Tag>
                    ) : (
                        <Tag color="error">{record.studentName}</Tag>
                    )}
                </>
            ),
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'studentCode',
            width: 200,
            key: 'studentCode',
        },
        {
            title: 'Email',
            dataIndex: 'studentEmail',
            key: 'studentEmail',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <>{record.status ? <span className='tw-text-blue-500'>Có mặt</span> : <span className='tw-text-red-500'>Vắng mặt</span>}</>
            ),
        },
        {
            title: 'Tình trạng',
            dataIndex: 'join',
            key: 'join',
            width: '20%',
            render: (_, record) =>
                <Button
                    disabled={record.isInvited}
                    onClick={() => handleInviteStudent({ student_email: record.studentEmail, id: record.id })}
                    className={`tw-border-transparent tw-w-[100px] tw-rounded-md tw-bg-[#0DB27F] tw-text-white
                        ${record.isInvited ? '!tw-bg-gray-700 hover:tw-bg-gray-700 tw-opacity-0' : ''}
                      dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400`}
                >
                    Mời lại.
                </Button>
        },
    ];

    const dataStudent = Object.values(data?.data || []).map((item, index) => {
        return {
            key: index + 1,
            id: item.id,
            studentCode: item.student_code,
            studentName: item.student_name,
            studentEmail: item.student_email,
            note: item.note,
            status: item.status,
            join: item.is_joined,
            isInvited: (item.is_sent_mail === 1 || item.status === 1) ? true : false,
            is_warning: item?.is_warning,
        };
    });


    return (
        <div>
            <Tooltip title="Xem danh sách sinh viên tham gia" color="#FF6D28">
                <button
                    onClick={showModal}
                    className="tw-flex tw-cursor-pointer tw-border-none tw-text-[#1890ff] hover:tw-bg-transparent"
                >
                    {content}
                </button>
            </Tooltip>
            <Modal
                className="!tw-top-[40px] tw-w-4/5"
                title="Danh sách sinh viên tham gia"
                open={isModalOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
                okText="Đóng"
                okButtonProps={{
                    className:
                        'tw-bg-gray-700 hover:tw-bg-gray-800 tw-border-none tw-rounded',
                }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <>
                    <h2 className="tw-mt- dark:tw-text-white">
                        Môn học: {subjectName}
                    </h2>
                    <div className="tw-mt-4">
                        <Table
                            loading={{
                                indicator: <Spinner />,
                                spinning: isLoading,
                            }}
                            pagination={false}
                            columns={columns}
                            dataSource={dataStudent}
                            tableLayout="auto"
                            rowKey="key"
                            className="attendance-table tw-border-[1px] tw-border-[#f0f0f0] tw-border-b-0"
                            scroll={{
                                y: 400,
                                x: 400
                            }}
                        />
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default AttendanceModal;
