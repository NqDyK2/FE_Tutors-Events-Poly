import { Button, Modal, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useGetAttendanceLessonListStudentMutation } from '../../../app/api/attendanceApiSlice';
import { useInViteClassMutation } from '../../../app/api/studentApiSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import { useEffect } from 'react';
import moment from 'moment/moment';

const AttendanceModal = ({ content, lessonId, subjectName, lesson }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showStudentNotCheckin, setShowStudentNotCheckin] = useState(false);
    const [skip, setSkip] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [inviteStudenttoClass] = useInViteClassMutation();
    const [getData, { data, isLoading, error }] = useGetAttendanceLessonListStudentMutation()
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
            title: '',
            dataIndex: 'join',
            key: 'join',
            width: '20%',
            render: (_, record) =>
                <Button
                    disabled={record.isInvited || !lesson.isHappenning}
                    onClick={() => handleInviteStudent({ student_email: record.studentEmail, student: record.id })}
                    className={`tw-border-transparent tw-w-[100px] tw-rounded-md tw-bg-[#0DB27F] tw-text-white
                        ${record.isInvited || !lesson.isHappenning ? '!tw-bg-gray-700 tw-opacity-0' : ''}
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


    const getListShow = (flag = false) => {
        return dataStudent.filter((item) => {
            return (flag && !item.status) || (!flag && item.status)
        })
    };

    useEffect(() => {
        if (lessonId && isModalOpen) {
            getData(lessonId)
        }
    }, [lessonId, isModalOpen])

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
                destroyOnClose
                // only render modal when it's visible to avoid unmounting after close
                forceRender
            >
                <>
                    <h2 className="tw-mt- dark:tw-text-white">
                        Môn học: {subjectName}
                    </h2>
                    <Button
                        onClick={() => setShowStudentNotCheckin(false)}
                        className={`tw-border-transparent tw-rounded-md tw-bg-[#0DB27F] tw-text-white
                        ${showStudentNotCheckin ? '!tw-bg-gray-400' : ''}
                        dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400 tw-mr-2`}
                    >
                        Sinh viên có mặt: {getListShow(false)?.length}
                    </Button>
                    <Button
                        onClick={() => setShowStudentNotCheckin(true)}
                        className={`tw-border-transparent tw-rounded-md tw-bg-[#0DB27F] tw-text-white
                        ${!showStudentNotCheckin ? '!tw-bg-gray-400' : ''}
                        dark:tw-border-white dark:tw-bg-[#202125] dark:hover:tw-bg-blue-400`}
                    >
                        Sinh viên 1/3 vắng mặt: {getListShow(true)?.length}
                    </Button>

                    <div className="tw-mt-4">
                        <Table
                            loading={{
                                indicator: <Spinner />,
                                spinning: isLoading,
                            }}
                            pagination={false}
                            columns={columns}
                            dataSource={getListShow(showStudentNotCheckin)}
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
