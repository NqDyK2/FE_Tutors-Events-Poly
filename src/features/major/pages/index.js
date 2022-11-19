import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, Table, Popconfirm, Popover, Tooltip } from 'antd';
import { Button } from 'antd/lib/radio';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetAllMajorQuery,
  useDeleteMajorMutation,
} from '../../../app/api/majorApiSlice';
import { useDeleteSubjectMutation } from '../../../app/api/subjectApiSlice';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';
import Spinner from '../../../components/Spinner';
import AddMajor from './ModalMajor/AddMajor';
import EditMajor from './ModalMajor/EditMajor';
import AddSubject from './ModalSubject/AddSubject';
import EditSubject from './ModalSubject/EditSubject';

const { Panel } = Collapse;

const MajorPage = () => {
  const dispatch = useDispatch();
  const { data: dataSubject, isLoading, error } = useGetAllMajorQuery();
  const [deleteSubject] = useDeleteSubjectMutation();
  const [deleteMajor] = useDeleteMajorMutation();

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([{ title: 'Quản lý môn học', path: `/manage/major` }]),
    );
  }, [dispatch]);

  // colums table
  const columns = [
    {
      title: 'Mã môn',
      dataIndex: 'code',
      key: 'code',
      render: (subject_code, record) => (
        <div className="tw-uppercase">{subject_code}</div>
      ),
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className="tw-float-right tw-mb-1 tw-flex tw-items-center tw-gap-2">
          <EditSubject data={record} />
          <div>
            <ConfirmPopup
              content={
                <Button className="tw-border-none tw-bg-transparent tw-p-2 hover:tw-bg-transparent dark:tw-text-white">
                  <Tooltip title="Xóa môn học" color="#FF6D28">
                    <DeleteOutlined
                      style={{ color: 'red' }}
                      className="tw-my-auto tw-w-full"
                    />
                  </Tooltip>
                </Button>
              }
              title="Bạn muốn xóa môn học này?"
              onConfirm={() => removeSubject(record.id)}
            />
          </div>
        </div>
      ),
    },
  ];
  // pop confirm
  const removeSubject = (id) => {
    deleteSubject(id)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
        } else if (response.error) {
          toast.error(response.error.data.message);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const removeMajor = (id) => {
    deleteMajor(id)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
        } else if (response.error) {
          toast.error(response.error.data.message);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Chuyên ngành - môn học</title>
      </Helmet>
      {isLoading && (
        <div className="tw-mt-[110px] tw-flex tw-justify-center">
          <Spinner
            tip={
              <p className="tw-text-orange-300 dark:tw-text-white">Loading</p>
            }
          />
        </div>
      )}
      <AddMajor />
      {error && (
        <div>
          <p className="tw-font-medium tw-text-red-500">
            {error?.response?.data?.message ||
              error?.data?.message ||
              error?.message ||
              'Đã có lỗi xảy ra!'}
          </p>
        </div>
      )}
      {dataSubject &&
        dataSubject?.data?.map((major, index) => {
          return (
            <Collapse
              key={index}
              className="tw-ml-4 tw-rounded-md tw-border-transparent tw-pl-3 tw-text-sm dark:tw-bg-[#202125]"
            >
              <Panel
                className="tw-text-lg"
                header={
                  <Tooltip
                    title="Ấn để  xem môn học trong danh sách hỗ trợ"
                    color="#FF6D28"
                  >
                    <span className="dark:tw-text-white !tw-mt-1 block"> {major.name} </span>
                  </Tooltip>
                }
                extra={
                  <Popover
                    placement="left"
                    trigger="click"
                    className="dark:tw-bg-[#202125] dark:tw-text-white dark:hover:tw-text-blue-400"
                    content={
                      <div>
                        <EditMajor data={{ id: major.id, name: major.name }} />
                        <div>
                          <Popconfirm
                            title="Bạn có chắc chắn muốn xóa ?"
                            placement="left"
                            onConfirm={() => removeMajor(major.id)}
                            okText="Xóa"
                            cancelText="Không"
                          >
                            <Button className="tw-border-transparent  tw-text-red-500">
                              Xóa chuyên ngành
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    }
                  >
                    <Button className="tw-border-none tw-bg-[#fafafa]">
                      <SettingOutlined />
                    </Button>
                  </Popover>
                }
              >
                <AddSubject
                  className="hover:tw-text-color-200 dark:tw-bg-[#202125]"
                  data={{ name: major.name, id: major.id }}
                />
                <Table
                  className="tw-mt-4"
                  columns={columns}
                  rowKey="id"
                  dataSource={major.subjects}
                  pagination={false}
                  scroll={{
                    x: 380,
                  }}
                />
              </Panel>
            </Collapse>
          );
        })}
    </>
  );
};

export default MajorPage;
