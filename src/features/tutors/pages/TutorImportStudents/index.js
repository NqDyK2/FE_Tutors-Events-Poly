/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker } from 'antd';
import XLSX from 'xlsx';
import { transform, mapKeys, startsWith, unionBy , chunk } from 'lodash';
import { useEffect } from 'react';
import { useImportStudentsSemesterMutation } from '../../../../app/api/semesterApiSlice';
import { toast } from 'react-toastify';

const { RangePicker } = DatePicker;
const TutorImportStudents = () => {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [
    importStudentsSemester,
    { isLoading: isImporting, isSuccess: isImported, error: importError },
  ] = useImportStudentsSemesterMutation();

  const handleFile = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    console.log(wb);

    const lopCanDanhGia = wb.SheetNames[0];

    const BMUDPM = wb.SheetNames[6];
    const BMCNTT = wb.SheetNames[7];
    const BMKT = wb.SheetNames[8];
    const BMDCK = wb.SheetNames[9];
    const BMTKDH = wb.SheetNames[10];
    const BMTMDT = wb.SheetNames[11];
    const BMDLNHKS = wb.SheetNames[12];
    const BMCB = wb.SheetNames[13];

    const allSheet = [
      BMUDPM,
      BMCNTT,
      BMKT,
      BMDCK,
      BMTKDH,
      BMTMDT,
      BMDLNHKS,
      BMCB,
    ];

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
    setLoading(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    const chunkData  = chunk(values.data, 10);
    console.log(chunkData);
    console.log(chunkData[0]);
    try {
      await Promise.all(chunkData.map((data) => importStudentsSemester({
        data: {
          data: data,
        },
        semesterId: 1,
       }))).then(
        (res) => {
          console.log(res);
          toast.success('Import thành công');
        }

        );
    } catch (error) {
      console.log(error);
      toast.error('Import thất bại');
    }

  };

  return (
    <>
      <Helmet>
        <title>FPoly</title>
      </Helmet>
      <div>
        <Form.Item label='Import sinh viên:' valuePropName='fileList'>
          <Input type='file' onChange={handleFile} />
        </Form.Item>
        <div>
          {isImported && <p>Import thành công</p>}
        </div>
        <div>
          {importError && <p>Import thất bại</p>}
        </div>
        <Form.Item
          label=''
          className='tw-flex tw-items-center  tw-justify-center'
        >
          <Button
            loading={isImporting}
            onClick={() => onFinish({ data: students })}
            className='tw-w-96 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2 '
          >
            Import
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default TutorImportStudents;
