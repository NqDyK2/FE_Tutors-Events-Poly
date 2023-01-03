import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import React, { useEffect, useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import XLSX from 'xlsx';
import { useImportResultSemesterMutation, } from '../../../app/api/semesterApiSlice';
import { useParams } from 'react-router-dom';

const FormImportResultRef = (props, ref) => {
  const [students, setStudents] = React.useState([]);
  const { id: semesterId } = useParams();
  const [importStudentsSemester, { isLoading: isImporting }] =
    useImportResultSemesterMutation();
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
    setFileLoading(true);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    const wsname = wb.SheetNames[0];

    const json = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);


    const importData = json.map((item, idx) => {
      let student = {
        id: idx + 1,
        student_code: item['Mã sinh viên'],
        subject: item['Mã môn'],
        final_score: item['Điểm thi đi'],
        final_result: item[Object.keys(item)[Object.keys(item).length - 1]],
      };

      return student;
    });
    setStudents(importData);
    setFileLoading(false);
  };



  const clearForm = () => {
    setVisible(false);
    setError(null);
    form.resetFields();
    setFile(null);
    setStudents([]);
  };

  const onFinish = async (values) => {
    if (students.length === 0) {
      toast.error('Vui lòng chọn file excel hợp lệ');
      return;
    }
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
      title={'Cập nhật danh sách sinh viên'}
      open={visible}
      okType="default"
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        clearForm();
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
                disabled={fileLoading || isImporting}
                accept=".xlsx, .xls, .csv"
                className=" tw-cursor-pointer tw-outline-none file:tw-cursor-pointer file:tw-rounded-xl file:tw-border-none file:tw-bg-pink-500 file:tw-px-2 file:tw-py-1 file:tw-text-white hover:file:tw-bg-pink-600 active:tw-border-none"
              />
            </Form.Item>
          </div>


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

export default forwardRef(FormImportResultRef);
