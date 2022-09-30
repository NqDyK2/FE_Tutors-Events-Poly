import React from 'react';
import './styles.css';
import { useLocation, useParams } from 'react-router-dom';
import { useGetAllLessonQuery } from '../../../app/api/lessonApiSlice';
import { Button, Spin, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const text = <span>
    HIẾU ĐÀM YÊU BÀ XÃ RẤT NHIỀU
</span>;

const columns = [
  {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text) => <strong>{text}</strong>,
      width: '5px'
  },
  {
      title: 'Ngày',
      dataIndex: 'ngay',
      key: 'ngay',
      width: '10%'
  },
  {
      title: 'Phòng',
      dataIndex: 'phong',
      key: 'phong',
  },
  {
      title: 'Giảng đường',
      dataIndex: 'giangduong',
      key: 'giangduong',
  },
  {
      title: 'Mã môn',
      dataIndex: 'mamon',
      key: 'mamon',
  },
  {
    title: 'Môn',
    dataIndex: 'mon',
    key: 'mon',
  },
  {
      title: 'Thời gian',
      dataIndex: 'thoigian',
      key: 'thoigian',
  },
  {
      title: 'Link học trực tuyến',
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => (
          <a href={record.link}>
              {record.link}
          </a>
      ),
  },
  {
      title: 'Trợ giảng',
      dataIndex: 'trogiang',
      key: 'trogiang',
  },
  {
      title: 'Nội dung',
      dataIndex: 'chitiet',
      key: 'chitiet',
      render: (_, record) => (
          <Tooltip placement="left" title={text} color={'orange'} >
              <p className='tw-cursor-pointer tw-text-blue-500'>
                  Nội dung
              </p>
          </Tooltip>
      ),
      width: 100
  },
  {
    title: '',
    render: (_, record) => (
        <div className='tw-flex'>
            <Button 
                onClick={() => alert('Sửa')}
                className='tw-bg-transparent tw-border-none hover:tw-bg-transparent'
            >
                <EditOutlined />
            </Button>
            <Button 
                onClick={() => alert('Xóa')}
                className='tw-bg-transparent tw-border-none hover:tw-bg-transparent'
            >
                <DeleteOutlined />
            </Button>
        </div>
    )
  }
];

const ListLesson = () => {
  const location = useLocation();
  const subjectId = location.state?.subjectId;
  const { id: classId } = useParams()
  const semesterId = location.state?.semester_id;

  let data = []
   
  const {
    data: lessonList,
    error: lessonError,
    isLoading: lessonLoading
  } = useGetAllLessonQuery(classId)

  if (lessonList) {
    data = lessonList['Detail lesson'].map((item, index) => {
      return {
        stt: index + 1,
        ngay: item.start_time.split(' ')[0],
        phong: item.type ? item.class_location : "Google Meet 2",
        giangduong: item.type ? 'TVB' : 'Google Meet',
        thoigian: `${item.start_time.split(' ')[1]} - ${item.end_time.split(' ')[1]}`,
        link: item.type ? "" : item.class_location
      }
    })
  }
  
  return (
    <div>
        {lessonLoading && <Spin/>}
      <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    </div>
  );
};

export default ListLesson;
