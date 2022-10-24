import { Cascader, Form, Input, Modal, Select } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useAddClassroomMutation } from '../../../app/api/classroomApiSlice';
import { toast } from 'react-toastify';
import { useGetAllSubjectQuery } from '../../../app/api/subjectApiSlice';
const { Option } = Select;

const MODE = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

const FormClassroomRef = ({ semester_id }, ref) => {
  const [addClassroom, { isLoading: addLoading }] = useAddClassroomMutation();
  const { data: listSubject } = useGetAllSubjectQuery();
  // console.log(listSubject?.data?.data);

  const dataSubject = listSubject?.data?.data.map((item) => ({
    value: item.slug,
    label: item.name,
    children: item.subjects.map((subject) => ({
      value: subject.id,
      label: subject.name,
    })),
  }));

  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [mode, setMode] = React.useState(MODE.ADD);

  useImperativeHandle(ref, () => ({
    show: (caseForm, data) => {
      form.setFieldsValue({ semester_id });
      setVisible(true);
      if (caseForm === MODE.ADD) {
        setTitle('Thêm lớp học');
        setMode(MODE.ADD);
      } else {
        setTitle('Sửa lớp học');
        setMode(MODE.EDIT);
        form.setFieldsValue({});
      }
    },

    hide: () => {
      setVisible(false);
    },
  }));

  // form antd
  const onFinish = (values) => {
    const dataRequest = {
      ...values,
      subject_id: values.subject_id.at(-1),
    };

    switch (mode) {
      case MODE.ADD:
        addClassroom(dataRequest)
          .unwrap()
          .then(() => {
            setVisible(false);
            form.resetFields();
            toast.success('Thêm thành công');
          })
          .catch((err) => {
            setError(err.data);
          });
        break;
      case MODE.EDIT:
        setTimeout(() => {
          toast.success('Chưa call APi');
        }, 1000);
        break;
      default:
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      okType="default"
      destroyOnClose
      okText="Lưu"
      getContainer={false}
      confirmLoading={addLoading}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setVisible(false);
        setError(null);
        form.resetFields();
      }}
      okButtonProps={{
        className:
          'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
      }}
      cancelButtonProps={{ className: 'hover:tw-bg-transparent' }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onChange={() => {
          setError(null);
        }}
      >
        <Form.Item name="semester_id" className="tw-hidden">
          <Input />
        </Form.Item>
        <Form.Item
          name="subject_id"
          label="Môn học"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Cascader placeholder="Chọn môn học" options={dataSubject} />
        </Form.Item>
        <Form.Item
          name="default_teacher_email"
          label="Giảng viên"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Select placeholder="Chọn giảng viên" allowClear>
            <Option value="hieuthuongtin@fe.vn">Híu Thường Tín</Option>
            <Option value="hieuheniken@fe.vn">Híu Heniken</Option>
            <Option value="hieuiubaxa@fe.vn">Híu iu bà xã</Option>
          </Select>
        </Form.Item>
      </Form>
      <div>
        {error && <div className="tw-text-red-500">{error.message}</div>}
      </div>
    </Modal>
  );
};

export default forwardRef(FormClassroomRef);
