/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Input, Button, DatePicker, Select, Upload, Progress } from 'antd';
import XLSX from 'xlsx';
import { transform, mapKeys, startsWith, unionBy, chunk } from 'lodash';
import { useEffect } from 'react';
import {
  useGetAllSemesterQuery,
  useImportStudentsSemesterMutation,
} from '../../../../app/api/semesterApiSlice';
import { toast } from 'react-toastify';

const { Option } = Select;

const TutorImportStudents = () => {
  const [students, setStudents] = React.useState([]);
  const  [form] = Form.useForm();
  const [
    importStudentsSemester,
    { isLoading: isImporting, isSuccess: isImported, error: importError },
  ] = useImportStudentsSemesterMutation();
  const {
    data: semesters,
    isLoading: isSemeLoading,
    error: semeError,
  } = useGetAllSemesterQuery();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });

    const lopCanDanhGia = wb.SheetNames[0];

    const BMUDPM = wb.SheetNames[6];
    const BMCNTT = wb.SheetNames[7];
    const BMKT = wb.SheetNames[8];
    const BMDCK = wb.SheetNames[9];
    const BMTKDH = wb.SheetNames[10];
    const BMTMDT = wb.SheetNames[11];
    const BMDLNHKS = wb.SheetNames[12];
    const BMCB = wb.SheetNames[13];

    const allSheet = [BMCNTT];

    const listGiangVien = unionBy(
      XLSX.utils.sheet_to_json(wb.Sheets[lopCanDanhGia]).map((item) => {
        const giangVien = {
          school_teacher_code: item['GIẢNG VIÊN'],
          school_teacher_name: item['__EMPTY'],
        };
        return giangVien;
      }),
      (item) => item.school_teacher_code
    );

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
      newItem.stt = idx + 1;
      newItem['sđt'] = newItem['sđt'] ? String(newItem['sđt']) : '';
      if (startsWith(newItem['sđt'], "'0")) {
        newItem['sđt'] = `0${newItem['sđt'].slice(2)}`;
      }
      delete newItem['bm/gv'];
      delete newItem['gv'];
      delete newItem['lớp môn'];
      delete newItem['môn nợ'];
      delete newItem['ngành'];
      delete newItem['tổng môn nợ'];
      delete newItem['điểm đánh giá'];
      delete newItem['kỳ'];
      delete newItem['__empty'];

      const returnItem = mapKeys(newItem, (value, key) => {
        switch (key) {
          case 'bộ môn':
            return 'major';
          case 'emai':
            return 'student_email';
          case 'giảng viên':
            return 'school_teacher_name';
          case 'họ tên sinh viên':
            return 'student_name';
          case 'lớp':
            return 'school_classroom';
          case 'mssv':
            return 'student_code';
          case 'môn':
            return 'subject';
          case 'ngành':
            return 'nganhHoc';
          case 'stt':
            return 'id';
          case 'sđt':
            return 'student_phone';
          case 'vấn đề gặp phải chi tiết':
            return 'reason';
          default:
        }
      });
      // renameKeys

      returnItem.school_teacher_code = listGiangVien.find(
        (gv) => gv.school_teacher_name === returnItem.school_teacher_name
      ).school_teacher_code;

      return returnItem;
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
      semesterId: values.semesterId,
    })
  };

  useEffect(() => {
    if (isImported) {
      toast.success('Import thành công');
      form.resetFields();
      setStudents([]);
    }
    if (importError) {
      toast.error('Import thất bại');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImported, importError]);

  return (
    <>
      <Helmet>
        <title>FPoly</title>
      </Helmet>
      <div className='sm:tw-w-1/2 tw-mx-auto'>
        <Form name='basic' layout='vertical' onFinish={onFinish}>
        <Form.Item
            name='semesterId'
            label='Chọn kỳ:'
            rules={[{ required: true, message: 'Không được trống' }]}
          >
            <Select placeholder='Chọn học kỳ' loading={isSemeLoading}>
              {semesters?.semester?.data?.map((semester) => (
                <Option key={semester.id} value={semester.id}>
                  {semester.name.toUpperCase()}
                </Option>
              ))}
            </Select>
          <Form.Item
            name='file'
            label='Import sinh viên:'
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
              className=' file:tw-bg-pink-500 hover:file:tw-bg-pink-600 tw-cursor-pointer file:tw-cursor-pointer file:tw-border-none file:tw-rounded-xl file:tw-px-2 file:tw-py-1 file:tw-text-white active:tw-border-none tw-outline-none'
            />
          </Form.Item>
          </Form.Item>
          <div className='dark:tw-text-slate-100 tw-text-green-500'>
            {isImported && <p>Import thành công</p>}
          </div>
          <div className='dark:tw-text-slate-100'>
            {importError && <p>Import thất bại</p>}
          </div>
          <Form.Item
            label=''
            className='tw-flex tw-items-center  tw-justify-center'
          >
            <Button
              loading={isImporting}
              htmlType='submit'
              className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2 '
            >
              Import
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TutorImportStudents;
