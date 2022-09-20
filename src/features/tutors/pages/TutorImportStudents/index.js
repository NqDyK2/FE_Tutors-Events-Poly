/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker } from 'antd';
import XLSX from 'xlsx';
import { transform, mapKeys, startsWith } from 'lodash';
import { useEffect } from 'react';

const { RangePicker } = DatePicker;
const TutorImportStudents = () => {
  const [totalStudents, setTotalStudents] = React.useState(null);
  const [studentByNganh, setStudentByNganh] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleFile = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    console.log(wb);
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

    const rowData = allSheet.map((sheet) => {
      const json = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
      return json;
    });

    const rowDataBySheetName = allSheet.map((sheet) => {
      const json = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
      const rowDataBySheetName = json
        .flat()
        .filter((item, idx) => idx !== 0 && item.STT !== undefined);
      let data = rowDataBySheetName.map((item, idx) => {
        const newItem = transform(item, (result, value, key) => {
          result[key.toLowerCase()] = value;
        });
        newItem.stt = idx + 1;
        const returnItem = mapKeys(newItem, (value, key) => {
          switch (key) {
            case 'bm/gv':
              return 'boMonVaGiaoVienDanhGia';
            case 'bộ môn':
              return 'boMon';
            case 'emai':
              return 'email';
            case 'giảng viên':
              return 'giangVien';
            case 'gv':
              return 'giangVienId';
            case 'họ tên sinh viên':
              return 'hoTenSinhVien';
            case 'kỳ':
              return 'kyHoc';
            case 'lớp':
              return 'lop';
            case 'lớp môn':
              return 'lopMon';
            case 'mssv':
              return 'mssv';
            case 'môn':
              return 'maMon';
            case 'môn nợ':
              return 'monNo';
            case 'ngành':
              return 'nganhHoc';
            case 'stt':
              return 'sinhVienId';
            case 'sđt':
              return 'sdtSinhVien';
            case 'tổng môn nợ':
              return 'tongMonNo';
            case 'vấn đề gặp phải chi tiết':
              return 'vanDeGapPhai';
            case 'điểm đánh giá':
              return 'diemDanhGiaDuLieuGoc';
            case '__empty':
              return 'diemDanhGiaDuLieuFix';
            default:
          }
        });
        // renameKeys

        return returnItem;
      });
      return { [sheet]: data };
    });

    setStudentByNganh(rowDataBySheetName);

    console.log('by sheet', rowDataBySheetName);
    console.log(studentByNganh);
    const json = rowData
      .flat()
      .filter((item, idx) => idx !== 0 && item.STT !== undefined);
    console.log(json);
    const importData = json.map((item, idx) => {
      const newItem = transform(item, (result, value, key) => {
        result[key.toLowerCase()] = value;
      });
      newItem.stt = idx + 1;
      newItem['sđt'] = newItem['sđt'] ? String(newItem['sđt']) : '';
      if (startsWith( newItem['sđt'], "'0")) {
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
            return 'user_email';
          case 'giảng viên':
            return 'school_teacher_name';
          case 'họ tên sinh viên':
            return 'user_name';
          case 'lớp':
            return 'school_classroom';
          case 'mssv':
            return 'user_code';
          case 'môn':
            return 'subject';
          case 'ngành':
            return 'nganhHoc';
          case 'stt':
            return 'id';
          case 'sđt':
            return 'user_phone';
          case 'vấn đề gặp phải chi tiết':
            return 'reason';
          default:
        }
      });
      // renameKeys

      return returnItem;
    });

    const filterStudentSame = importData.filter((item) => {
      const student = importData.filter(
        (student) => student.user_code === item.user_code
      );
      return student.length > 1;
    });
    console.log('filterStudentSame', filterStudentSame);
    setTotalStudents(importData.length);
    setLoading(false);
    console.log('all', importData);
  };
  useEffect(() => {
    console.log(studentByNganh);
  }, [studentByNganh]);
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
          {totalStudents && (
            <>
              <div>
                <p>Tổng số sinh viên: {totalStudents}</p>
              </div>
            </>
          )}
          {studentByNganh && (
            <>
              {studentByNganh.map((item) => {
                const key = Object.keys(item)[0];
                return (
                  <div>
                    <p>
                      {key}: {item[key].length}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <Form.Item
          label=''
          className='tw-flex tw-items-center  tw-justify-center'
        >
          <Button
            loading={loading}
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
