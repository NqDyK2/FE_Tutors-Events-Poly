/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
import XLSX from 'xlsx';
import { transform } from 'lodash';

const { RangePicker } = DatePicker;
const AddClassPage = () => {
  const [fileName, setFileName] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleFile = async (e) => {
    console.log(e);
    setLoading(true);
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    setLoading(false);
    const wb = XLSX.read(data, { type: 'array' });
    const wsname = wb.SheetNames[0];
    const json = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    json.map((item) => {
      const newItem = transform(item, (result, value, key) => {
        result[key.toLowerCase()] = value;
      });
      return newItem;
    });
    console.log(json);
  };
  return (
    <>
      <Helmet>
        <title>Tạo lớp - FPoly</title>
      </Helmet>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
        >
          <Form.Item label='Tên lớp:'>
            <Input />
          </Form.Item>
          <Form.Item label='Môn học:'>
            <Cascader
              options={[
                {
                  value: 'Công nghệ thông tin',
                  label: 'Công nghệ thông tin',
                  children: [
                    {
                      value: 'Phát triển phần mềm',
                      label: 'Phát triển phần mềm',
                    },
                    {
                      value: 'Lập trình Web',
                      label: 'Lập trình Web',
                      children: [
                        {
                          value: 'Xây dựng trang Web - WEB1013',
                          label: 'Xây dựng trang Web - WEB1013',
                        },
                        {
                          value: 'Lập trình với JavaScript',
                          label: 'Lập trình với JavaScript',
                        },
                        {
                          value: 'Thiết kế web với HTML5 & CSS3',
                          label: 'Thiết kế web với HTML5 & CSS3',
                        },
                      ],
                    },
                    {
                      value: 'Lập trình Mobile',
                      label: 'Lập trình Mobile',
                    },
                    {
                      value: 'Ứng dụng phần mềm',
                      label: 'Ứng dụng phần mềm',
                    },
                    {
                      value: 'Xử lý dữ liệu',
                      label: 'Xử lý dữ liệu',
                    },
                  ],
                },
                {
                  value: 'Quản trị kinh doanh',
                  label: 'Quản trị kinh doanh',
                  children: [
                    {
                      value: 'Digital Marketing',
                      label: 'Digital Marketing',
                    },
                    {
                      value: 'Quan hệ công chúng & tổ chức sự kiện',
                      label: 'Quan hệ công chúng & tổ chức sự kiện',
                    },
                    {
                      value: 'Marketing & Sales',
                      label: 'Marketing & Sales',
                    },
                    {
                      value: 'Quản trị khách sạn',
                      label: 'Quản trị khách sạn',
                    },
                    {
                      value: 'Quản trị nhà hàng',
                      label: 'Quản trị nhà hàng',
                    },
                    {
                      value: 'Logistic',
                      label: 'Logistic',
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label='Thời gian:'>
            <RangePicker />
          </Form.Item>
          <Form.Item label='Online/Offline:'>
            <Radio.Group>
              <Radio value='apple'> Online </Radio>
              <Radio value='pear'> Offline </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Thêm sinh viên:' valuePropName='fileList'>
            <Input type='file' onChange={handleFile} />
          </Form.Item>
          <Form.Item
            label=''
            className='tw-flex tw-items-center  tw-justify-center'
          >
            <Button loading={loading} className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2 '>
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddClassPage;
