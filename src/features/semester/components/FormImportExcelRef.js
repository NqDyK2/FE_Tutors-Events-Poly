import { Button, Form, Input, Modal, Select, Spin, Table } from 'antd';
import React, { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import XLSX from 'xlsx';
import { useImportStudentsSemesterMutation } from '../../../app/api/semesterApiSlice';
import { transform } from 'lodash';
import './styles.css';
import { useParams } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';

const FormImportExcelRef = (props, ref) => {
  const [students, setStudents] = React.useState([]);
  const { id: semesterId } = useParams();
  const [
    importStudentsSemester,
    { isLoading: isImporting, isSuccess: isImported, error: importError },
  ] = useImportStudentsSemesterMutation();
  const [file, setFile] = React.useState(null);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },

    hide: () => {
      setVisible(false);
    },
  }));

  const previewColumn = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_code',
      key: 'student_code',
      filterSearch: true,
      filters: students.map((student) => ({
        text: student.student_code,
        value: student.student_code,
      })),
      onFilter: (value, record) => record.student_code.indexOf(value) === 0,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Email',
      dataIndex: 'student_email',
      key: 'student_email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'student_phone',
      key: 'student_phone',
    },
    {
      title: 'Môn',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Vấn đề',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];

  const handleFile = async (e) => {
    setFile(e);
    setFileLoading(true);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    // const BMUDPM = wb.SheetNames[6];
    const BMCNTT = wb.SheetNames[7];
    // const BMKT = wb.SheetNames[8];
    // const BMDCK = wb.SheetNames[9];
    // const BMTKDH = wb.SheetNames[10];
    // const BMTMDT = wb.SheetNames[11];
    // const BMDLNHKS = wb.SheetNames[12];
    // const BMCB = wb.SheetNames[13];

    const allSheet = [BMCNTT];

    const rowData = allSheet.map((sheet) => {
      const json = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
      return json;
    });

    const json = rowData
      .flat()
      .filter((item, idx) => idx !== 0 && item.STT !== undefined);
    const importData = json.map((item, idx) => {
      let student = {
        id: idx + 1,
        student_code: item['MSSV'],
        student_name: item['Họ tên sinh viên'],
        student_email: item['Email'],
        student_phone: item['SĐT'],
        major: item['Bộ môn'],
        subject: item['Môn'],
        reason: item['Vấn đề gặp phải chi tiết'],
      };

      return student;
    });
    setStudents(importData);
    setFileLoading(false);
  };

  const clearForm = () => {
    form.resetFields();
    setFile(null);
    setStudents([]);
  };

  const onFinish = async (values) => {
    if (students.length === 0) {
      toast.error('Vui lòng chọn file excel hợp lệ');
      return;
    }
    // const chunkData = chunk(values.data, 100);
    // console.log(chunkData);
    // console.log(chunkData[0]);
    // await Promise.all(
    //   chunkData.map((data) =>
    //     importStudentsSemester({
    //       data: {
    //         data,
    //       },
    //       semesterId: 1,
    //     })
    //   )
    // );
    await importStudentsSemester({
      data: {
        data: students,
      },
      semesterId,
    })
      .unwrap()
      .then((res) => {
        toast.success('Import thành công');
        setVisible(false);
        form.resetFields();
      });
  };

  return (
    <Modal
      title={'Import danh sách sinh viên'}
      open={visible}
      okType='default'
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setVisible(false);
        setError(null);
        form.resetFields();
      }}
      okText='Lưu'
      confirmLoading={isImporting}
      destroyOnClose
      okButtonProps={{
        className: `
        ${fileLoading ? 'tw-bg-gray-400' : 'tw-bg-sky-400'}
        tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none
       `,
      }}
      cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
      getContainer={false}
    >
      <div>
        <Form
          form={form}
          preserve={false}
          name='importForm'
          layout='vertical'
          onFinish={onFinish}
          onChange={() => {
            setError(null);
          }}
        >
          <div
            className='
           tw-relative
          '
          >
            <Form.Item
              name='file'
              label='Chọn file excel'
              valuePropName='filelist'
              rules={[
                { required: true, message: 'Không được trống' },
                () => ({
                  validator(_, value) {
                    if (
                      value &&
                      !value.target.files[0].name.endsWith('.xlsx') &&
                      !value.target.files[0].name.endsWith('.xls') &&
                      !value.target.files[0].name.endsWith('.csv')
                    ) {
                      return Promise.reject('Chỉ được chọn file excel');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type='file'
                onChange={handleFile}
                accept='.xlsx, .xls, .csv'
                className=' tw-cursor-pointer tw-outline-none file:tw-cursor-pointer file:tw-rounded-xl file:tw-border-none file:tw-bg-pink-500 file:tw-px-2 file:tw-py-1 file:tw-text-white hover:file:tw-bg-pink-600 active:tw-border-none'
              />
            </Form.Item>
            {file && !fileLoading && (
              <Button
                type='text'
                icon={<CloseCircleFilled />}
                className='tw-absolute tw-top-[30px] tw-right-0 tw-mt-1 tw-rounded-full tw-border-none  tw-text-slate-500 tw-outline-none hover:tw-bg-transparent hover:tw-text-slate-600 '
                onClick={clearForm}
              ></Button>
            )}
          </div>
        </Form>

        <div>
          {error && (
            <div className='tw-text-red-500'>
              {error?.response?.data?.message || error?.message}
            </div>
          )}
          {fileLoading && (
            <div className='tw-flex tw-items-center tw-justify-center tw-text-blue-300'>
              Đang xử lý file...
              <Spin />
            </div>
          )}
        </div>
      </div>

      {students.length > 0 && (
        <Button type='primary' onClick={() => setPreviewOpen(true)}>
          Xem trước
        </Button>
      )}

      <Modal
        title='Xem trước'
        centered
        open={previewOpen}
        onOk={() => setPreviewOpen(false)}
        onCancel={() => setPreviewOpen(false)}
        width={1000}
      >
        <Table
          columns={previewColumn}
          dataSource={students}
          scroll={{ y: 400 }}
          rowKey='id'
          
        />
      </Modal>
    </Modal>
  );
};

export default forwardRef(FormImportExcelRef);
