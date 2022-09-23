import { Image, Input, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSubjectQuery } from '../../../app/api/semesterApiSlice';

const SubjectPage = () => {
  const {id} = useParams();
  const { Option } = Select;
  const { data, error, isLoading } = useGetSubjectQuery(id);
  console.log(data);

  
const columns = [
    {
      title: '#',
      key: 'index',
      render: (_, record) => (
          <span className='tw-font-bold'>{record.index}</span>
      ),
      width: "5%"
    },
    {
      title: 'Tên lớp',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Ảnh',
      key: 'image',
      dataIndex: 'image',
      render: (_, record) => (
          <Image width={70} src= {record.image} alt="IMG"/>
      ),
    },
    {
      title: 'Chú thích',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, record) => (
          <Input className='tw-rounded'/>
      ),
      width: '25%'
    }
  ];
  const data1 = [
    {
      key: 1,
      index: 1,
      className: "WE16304",
      studentCode: 'PH18088',
      studentName: 'Nguyễn Văn A',
      image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
      comment: ''
    },
    {
      key: 2,
      index: 2,
      className: "WE16304",
      studentCode: 'PH18099',
      studentName: 'Nguyễn Văn B',
      image: '',
      comment: ''
    },
    {
      key: 3,
      index: 3,
      className: "WE16304",
      studentCode: 'PH18087',
      studentName: 'Nguyễn Văn C',
      image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
      comment: ''
    },
    {
      key: 4,
      index: 4,
      className: "WE16304",
      studentCode: 'PH17088',
      studentName: 'Nguyễn Văn D',
      image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg', 
      comment: 'Dốt dcd'
    },
    {
      key: 5,
      index: 5,
      className: "WE16304",
      studentCode: 'PH15088',
      studentName: 'Nguyễn Văn E',
      image: 'https://ss-images.saostar.vn/wp700/pc/1617160792140/saostar-ad0lx1k2h7n0blgh.jpg',
      comment: ''
    },
  
  ];

  return (
    <div className='tw-w-full'>
      <div className='tw-flex tw-justify-center '>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Chọn môn học"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="1">Lập trình Front-End Framework 1</Option>
          <Option value="2">Lập trình TypeScript</Option>
          <Option value="3">NodeJS & Restful Web Service	</Option>
          <Option value="4">Lập trình ECMAScript</Option>
        </Select>
      </div>
      <div className='tw-border-b-2'>
        <span className='tw-text-[15px]'>Danh sách sinh viên</span>
      </div>
      <div className='tw-mt-6'>
        <Table key={data1.key} columns={columns} dataSource={data1} pagination={false}  />
        <TextArea placeholder="Ghi chú lớp" rows={4} className="tw-mt-5 tw-rounded-md" maxLength={6} />
      </div>
    </div>
  )
};

export default SubjectPage;
