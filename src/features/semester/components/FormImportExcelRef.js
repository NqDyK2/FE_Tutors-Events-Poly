import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import React, { useEffect, useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import XLSX from 'xlsx';
import { useImportStudentsSemesterMutation } from '../../../app/api/semesterApiSlice';
import { useParams } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';

const FormImportExcelRef = (props, ref) => {
  const [students, setStudents] = React.useState([]);
  const [sheets, setSheets] = React.useState([]);
  const [selectedSheet, setSelectedSheet] = React.useState([]);
  const { id: semesterId } = useParams();
  const [importStudentsSemester, { isLoading: isImporting }] =
    useImportStudentsSemesterMutation();
  const [file, setFile] = React.useState(null);
  const [fileLoading, setFileLoading] = React.useState(false);
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
    setFile(e);
    // setFileLoading(true);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    setSheets(wb.SheetNames);
    // const BMUDPM = wb.SheetNames[6];
    // const BMCNTT = wb.SheetNames.find((sheet) =>
    //   sheet.includes('BM CNTT' || 'BM Công nghệ thông tin' || 'BMCNTT'),
    // );
    // const BMKT = wb.SheetNames[8];
    // const BMDCK = wb.SheetNames[9];
    // const BMTKDH = wb.SheetNames[10];
    // const BMTMDT = wb.SheetNames[11];
    // const BMDLNHKS = wb.SheetNames[12];
    // const BMCB = wb.SheetNames[13];

    // const allSheet = [BMCNTT];
    const rowData = selectedSheet.map((sheet) => {
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
        subject: item['Môn'],
        reason: item['Vấn đề gặp phải chi tiết'],
      };

      return student;
    });
    setStudents(importData);
    setFileLoading(false);
  };

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [selectedSheet]);

  const clearForm = () => {
    setVisible(false);
    setError(null);
    form.resetFields();
    setSheets([]);
    selectedSheet([]);
    setFile(null);
    setStudents([]);
  };

  const onFinish = async (values) => {
    if (students.length === 0) {
      toast.error('Vui lòng chọn file excel hợp lệ');
      return;
    }
    // const chunkData = chunk(values.data, 100);

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
        toast.success(res.message);
        clearForm();
      });
  };

  return (
    <Modal
      title={'Import danh sách sinh viên'}
      open={visible}
      okType="default"
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setVisible(false);
        setError(null);
        form.resetFields();
        setSheets([]);
        selectedSheet([]);
        setFile(null);
        setStudents([]);
      }}
      okText="Lưu"
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
          name="importForm"
          layout="vertical"
          onFinish={onFinish}
          onChange={() => {
            setError(null);
          }}
        >
          <div
            className="
           tw-relative
          "
          >
            <Form.Item
              name="file"
              label="Chọn file excel"
              valuePropName="filelist"
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
                type="file"
                onChange={handleFile}
                accept=".xlsx, .xls, .csv"
                className=" tw-cursor-pointer tw-outline-none file:tw-cursor-pointer file:tw-rounded-xl file:tw-border-none file:tw-bg-pink-500 file:tw-px-2 file:tw-py-1 file:tw-text-white hover:file:tw-bg-pink-600 active:tw-border-none"
              />
            </Form.Item>
          </div>

          {sheets.length > 0 && (
            <Form.Item
              name="sheet"
              label="Chọn sheet"
              rules={[{ required: true, message: 'Không được trống' }]}
            >
              <Select
                placeholder="Chọn sheet"
                mode="multiple"
                className="tw-rounded-xl tw-border-none tw-bg-sky-100 hover:tw-bg-sky-200"
                onSelect={(value) => {
                  setSelectedSheet(
                    selectedSheet.concat(
                      sheets.filter((item) => item === value),
                    ),
                  );
                }}
              >
                {sheets.map((sheet) => (
                  <Select.Option value={sheet}>{sheet}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>

        <div>
          {error && (
            <div className="tw-text-red-500">
              {error?.response?.data?.message || error?.message}
            </div>
          )}
          {fileLoading && (
            <div className="tw-flex tw-items-center tw-justify-center tw-text-blue-300">
              Đang xử lý file...
              <Spin />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(FormImportExcelRef);
