import React from 'react';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import {
  useDelLessonMutation,
  useGetAllLessonQuery,
} from '../../../app/api/lessonApiSlice';
import { Button, Spin, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FormLessonRef from '../components/FormLessonRef';
import { FaReply } from 'react-icons/fa';
import { toast } from 'react-toastify';
import moment from 'moment';

const text = <span>HIẾU ĐÀM YÊU BÀ XÃ RẤT NHIỀU</span>;

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    render: (text) => <strong>{text}</strong>,
    width: '5%',
  },
  {
    title: 'Ngày',
    dataIndex: 'ngay',
    key: 'ngay',
    width: '10%',
  },
  {
    title: 'Giảng đường',
    dataIndex: 'giangduong',
    key: 'giangduong',
    width: '5%',
  },
  {
    title: 'Phòng',
    dataIndex: 'phong',
    key: 'phong',
    width: '5%',
  },
  {
    title: 'Mã môn',
    dataIndex: 'mamon',
    key: 'mamon',
    width: '5%',
  },
  {
    title: 'Môn',
    dataIndex: 'mon',
    key: 'mon',
    width: '15%',
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian',
    key: 'thoigian',
    width: '10%',
  },
  {
    title: 'Link học trực tuyến',
    dataIndex: 'link',
    key: 'link',
    width: '10%',
    render: (text) => (
      <a target='blank' href={text}>
        {text}
      </a>
    ),
  },
  {
    title: 'Giảng viên',
    dataIndex: 'giangvien',
    key: 'giangvien',
    width: '5%',
  },
  {
    title: 'Trợ giảng',
    dataIndex: 'trogiang',
    key: 'trogiang',
    width: '5%',
  },
  {
    title: 'Nội dung',
    dataIndex: 'chitiet',
    key: 'chitiet',
    render: (_, record) => (
      <Tooltip placement='left' title={text} color={'orange'}>
        <span className='tw-cursor-pointer tw-text-blue-500'>Nội dung</span>
      </Tooltip>
    ),
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <div className='tw-flex'>
        <Button
          onClick={() => {
            record.action.modalRef.current.show('EDIT', record.action.item);
          }}
          className='tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent'
        >
          <EditOutlined />
        </Button>
        <Button
          onClick={() => {
            record.action.handleRemoveLesson(record.id);
          }}
          className='tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent'
        >
          <DeleteOutlined />
        </Button>
      </div>
    ),
  },
];

const ListLesson = () => {
  const location = useLocation();
  const { subjectId, semesterId, subjectName } = location.state;

  const modalRef = React.useRef();

  let data = [];

  const [removeLesson] = useDelLessonMutation();

  const handleRemoveLesson = (id) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa?');
    if (confirm) {
      removeLesson(id);
      toast.success('Xóa buổi học thành công.');
    }
  };

  const {
    data: lessonList,
    error: lessonError,
    isLoading: lessonLoading,
  } = useGetAllLessonQuery(subjectId);

  if (lessonList) {
    data = lessonList.data.map((item, index) => {
      return {
        key: index,
        stt: index + 1,
        id: item.id,
        ngay: moment(item.start_time.split(' ')[0]).format('L'),
        phong: item.type ? item.class_location_offline : 'Google Meet 2',
        giangduong: item.type ? 'TVB' : 'Google Meet',
        thoigian: `${item.start_time.split(' ')[1]} - ${
          item.end_time.split(' ')[1]
        }`,
        link: item.class_location_online,
        trogiang: '',
        giangvien: item.teacher,
        mamon: item.name,
        mon: 'Dự án tốt nghiệp (TKTW-Single page Application)',
        action: { modalRef, item, handleRemoveLesson },
      };
    });
  }

  return (
    <div>
      <div className='tw-flex tw-justify-between tw-border-b-2 tw-pb-1'>
        <span className='tw-text-[15px]'>Lịch học {subjectName}</span>
        <span>
          <Button
            onClick={() =>
              modalRef.current.show('ADD', { subjectName, subjectId })
            }
            className='tw-justify-end hover:tw-bg-blue-500 hover:tw-text-white'
          >
            Thêm buổi học
          </Button>
        </span>
        <Link
          to={`/manage/sem/${semesterId}`}
          className='tw-flex tw-items-center hover:tw-text-blue-600'
        >
          <FaReply className='tw-mr-1' /> Trở lại
        </Link>
      </div>

      {lessonLoading && <Spin className='tw-mt-3' />}
      {lessonList && (
        <div className='tw-mt-6'>
          <Table
            key={data.key}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      )}

      <FormLessonRef ref={modalRef} />
    </div>
  );
};

export default ListLesson;
