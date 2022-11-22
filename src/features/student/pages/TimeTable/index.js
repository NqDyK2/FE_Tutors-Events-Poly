import React, { useState } from 'react';
import { Table, Modal, Tooltip, Form, Input, Radio, Button, List } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { toast } from 'react-toastify';

import {
  useGetAllMissingClassQuery,
  useGetScheduleQuery,
  useJoinClassMutation,
} from '../../../../app/api/studentApiSlice';
import { timeFormat } from '../../../../utils/TimeFormat';
import Spinner from '../../../../components/Spinner';

const TimeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinClass, { isLoading: joinClassPending }] = useJoinClassMutation();
  const { data: listClassMisses, isLoading: listclassPending } =
    useGetAllMissingClassQuery();
  const { data: listSchedule, isLoading: listSchedulePending } =
    useGetScheduleQuery({ skip: listClassMisses?.data.length });

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => { };
  const onFinishFailed = (errorInfo) => { };

  // table antd
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
    },
    {
      title: 'Hình thức',
      dataIndex: 'hinhthuc',
      key: 'hinhthuc',
    },
    {
      title: 'Mã môn',
      dataIndex: 'subjects_code',
      key: 'subjects_code',
    },
    {
      title: 'Môn',
      dataIndex: 'subjects_name',
      key: 'subjects_name',
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoigian',
      key: 'thoigian',
    },
    {
      title: 'Phòng học',
      dataIndex: 'phonghoc',
      key: 'phonghoc',
      width: '10%',
      render: (_, record) =>
        record.hinhthuc === 'Offline' ? (
          <span>{record.phonghoc}</span>
        ) : (
          <a
            target="blank"
            href={record.phonghoc}
            className="hover:tw-text-hoverLink"
          >
            {record.phonghoc}
          </a>
        ),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'teacher_email',
      key: 'teacher_email',
    },
    {
      title: 'Trợ giảng',
      dataIndex: 'tutor_email',
      key: 'tutor_email',
      width: '5%',
    },
    {
      title: 'Nội dung',
      dataIndex: 'chitiet',
      key: 'chitiet',
      render: (_, record) => (
        <Tooltip
          title={record.chitiet}
          placement="topLeft"
          color="#FF6D28" trigger={'click'}
        >
          <span className="tw-cursor-pointer tw-text-blue-500">Nội dung</span>
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'phanhoi',
      key: 'phanhoi',
      render: (_, record) => (
        <span className="tw-cursor-pointer tw-text-blue-500">
          <span
            className="tw-cursor-pointer tw-text-blue-500"
            onClick={() => showModal()}
          >
            Phản hồi về buổi học.
          </span>
        </span>
      ),
      width: 150,
    },
  ];

  const dataClass = listClassMisses?.data.map((item, index) => ({
    key: index,
    id: item.id,
    subject_name: item.name,
    subject_code: item.code,
  }));
  const dataTable = listSchedule?.data.map((item, index) => ({
    key: index,
    stt: index + 1,
    ngay: timeFormat(item.start_time.split(' ')[0]),
    hinhthuc: item.type ? 'Offline' : 'Online',
    thoigian: `${item.start_time?.split(' ')[1]} - ${item.end_time?.split(' ')[1]
      }`,
    phonghoc: item.class_location,
    tutor_email: item.tutor_email?.split('@')[0],
    teacher_email: item.teacher_email.split('@')[0],
    subjects_code: item.subject_code?.toUpperCase(),
    subjects_name: item.subject_name,
    chitiet: item.content,
  }));

  const handleJoinClass = (id) => {
    joinClass(id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => toast.error('Có lỗi xả ra.'));
  };

  if (listclassPending || listSchedulePending) {
    return (
      <div className="tw-mt-[110px] tw-flex tw-justify-center">
        <Spinner
          tip={
            <p className="tw-mt-5 tw-text-orange-300 dark:tw-text-white">
              Loading
            </p>
          }
        />
      </div>
    );
  }

  return (
    <div>
      {!listClassMisses?.data.length ? (
        <Table
          key={dataTable?.key}
          columns={columns}
          dataSource={dataTable}
          pagination={false}
          scroll={{
            x: 380,
          }}
          loading={{
            indicator: <Spinner />,
            spinning: listSchedulePending,
          }}
        />
      ) : (
        <div>
          <h2 className="tw-mb-4 tw-text-center tw-text-lg">
            Bạn có {dataClass?.length} môn học cần tham gia tutor.
          </h2>
          <List
            dataSource={dataClass}
            renderItem={(item, index) => (
              <List.Item key={item.key}>
                <List.Item.Meta
                  title={<p className="tw-mb-0">{item.subject_code}</p>}
                  description={
                    <p className="tw-text-[#555]">{item.subject_name}</p>
                  }
                />
                <div>
                  <Button
                    onClick={() => handleJoinClass(item.id)}
                    type="primary"
                    className="tw-rounded-lg tw-border-0 tw-bg-[#04b0a6] hover:tw-bg-[#01988f]"
                  >
                    Tham gia
                  </Button>
                </div>
              </List.Item>
            )}
          />
          <p className="tw-text-center tw-text-[#777]">
            Vui lòng tham gia tất cả để theo dõi lịch học.
          </p>
        </div>
      )}

      {/* box modal */}
      <Modal
        title="Phản hồi buổi học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Gửi phản hồi"
      >
        <div>
          <Form
            form={form}
            initialValues={{
              phanhoigv: '',
              phanhoitutor: '',
              chatluongbuoihoc: '',
              muondamDamMinhHieuKhong: '',
              ykiendonggop: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              required
              name="qualitylesson"
              label="Bạn thấy chất lượng buổi học như thế nào?"
            >
              <Radio.Group>
                <Radio value="good"> Tốt </Radio>
                <Radio value="medium"> Trung bình </Radio>
                <Radio value="bad"> Yếu </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              required
              name="qualityteacher"
              label="Giảng viên hỗ trợ môn tốt không?"
            >
              <Radio.Group>
                <Radio value="lgood"> Tốt </Radio>
                <Radio value="lmedium"> Trung bình </Radio>
                <Radio value="lbad"> Yếu </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              required
              name="qualitytutor"
              label="Người hỗ trợ buổi học có nhiệt tình không"
            >
              <Radio.Group>
                <Radio value="tugood"> Tốt </Radio>
                <Radio value="tumedium"> Trung bình </Radio>
                <Radio value="tubad"> Yếu </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              required
              name="knowledgeDễ"
              label="Mức độ hiểu bài của bạn."
            >
              <Radio.Group>
                <Radio value="kgood"> 100% </Radio>
                <Radio value="kgood_medium"> 75% </Radio>
                <Radio value="kmedium"> 50% </Radio>
                <Radio value="kmedium_bad"> 25% </Radio>
                <Radio value="kbad"> 0% </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="question"
              label="Bạn có câu hỏi gì giành cho buổi học sau không?"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="note"
              label="Bạn muốn nhắn nhủ thêm điều gì không?"
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default TimeTable;
