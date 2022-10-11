import { Form, Input, Modal, Select } from 'antd';
import React, { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import XLSX from 'xlsx';
import { useImportStudentsSemesterMutation } from '../../../app/api/semesterApiSlice';
import { transform } from 'lodash';
import './styles.css';
import { useParams } from 'react-router-dom';

const FormImportExcelRef = (props, ref) => {
  const [students, setStudents] = React.useState([]);
  const { id: semesterId } = useParams();
  const [
    importStudentsSemester,
    { isLoading: isImporting, isSuccess: isImported, error: importError },
  ] = useImportStudentsSemesterMutation();

  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },

    hide: () => {
      setVisible(false);
    },
  }));

  const handleFile = async (e) => {
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
      const newItem = transform(item, (result, value, key) => {
        result[key.toLowerCase()] = value;
      });
      let student = {
        id: idx + 1,
        student_code: newItem['mssv'],
        student_name: newItem['họ tên sinh viên'],
        student_email: newItem['email'],
        student_phone: newItem['sđt'],
        major: newItem['bộ môn'],
        subject: newItem['môn'],
        reason: newItem['vấn đề gặp phải chi tiết'],
      };

      return student;
    });
    setStudents(importData);
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
        className:
          'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
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
        </Form>

        <div>
          {error && (
            <div className='tw-text-red-500'>
              {error?.response?.data?.message || error?.message}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(FormImportExcelRef);
