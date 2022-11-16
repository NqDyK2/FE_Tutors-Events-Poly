import { Table } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListFeedback = () => {
  const navigate = useNavigate();
  let colums = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
    },
    {
      title: 'Mức độ hiểu bài',
      dataIndex: 'levelUnderstand',
      key: 'lelevelUnderstandvel',
      width: '10%',
    },
    {
      title: 'Mức độ nhiệt tình của GV',
      dataIndex: 'levelEnthusiasmTeacher',
      key: 'levelEnthusiasmTeacher',
      width: '15%',
    },
    {
      title: 'Mức độ nhiệt tình của Tutor',
      dataIndex: 'levelEnthusiasmTutor',
      key: 'levelEnthusiasmTutor',
      width: '15%',
    },
    {
      title: 'Các vấn đề của bạn đã được giải quyết chưa?',
      dataIndex: 'problem',
      key: 'problem',
    },
    {
      title: 'Lời nhắn',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  const dataSource = [
    {
      key: '1',
      id: 1,
      levelUnderstand: 'Hiểu',
      levelEnthusiasmTeacher: 'Nhiệt tình',
      levelEnthusiasmTutor: 'Nhiệt tình',
      problem: 'Đã được giải quyết',
      note: 'Nội dung phản hồi ở đây',
    },
    {
      key: '2',
      id: 2,
      levelUnderstand: 'Hơi hơi hiểu',
      levelEnthusiasmTeacher: 'Hơi nhơi nhiệt',
      levelEnthusiasmTutor: 'Hơi nhơi nhiệt',
      problem: 'Chưa được giải quyết',
      note: 'Góp ý ở phần này',
    },

    {
      key: '3',
      id: 3,
      levelUnderstand: ' Không hiểu',
      levelEnthusiasmTeacher: 'Không nhiệt tình',
      levelEnthusiasmTutor: 'Không nhiệt tình',
      problem: 'Sẽ được giải quyết trong các buổi học sắp tới',
      note: 'UI Gvien xem phản hồi, góp ý của sinh viên tham gia học.',
    },
  ];
  return (
    <>
      <Helmet>
        <title>Phản hồi</title>
      </Helmet>
      <div>
        <div className="tw-flex tw-justify-between tw-border-b-2 tw-pb-1">
          <span className="tw-text-[15px] dark:tw-text-white">
            Hòm thư góp ý - Môn học: (Tên môn học ở đây)
          </span>
          <button
            onClick={() => navigate(-1)}
            className="tw-flex tw-items-center tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-700"
          >
            <FaReply className="tw-mr-1" /> Trở lại
          </button>
        </div>
        <Table
          size="small"
          scroll={{ x: 380 }}
          dataSource={dataSource}
          columns={colums}
          pagination={false}
          // loading={{ indicator: <Spinner />, spinning: `Loading...` }}
        />
      </div>
    </>
  );
};

export default ListFeedback;
