import { Button, Popover, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteSemesterMutation,
  useGetAllSemesterQuery,
} from '../../../app/api/semesterApiSlice';
import {
  EditOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import Img1 from './../../../assets/images/CNDT1.png';
import FormSemeterRef from '../components/FormSemeterRef';
import Spinner from '../../../components/Spinner';
import moment from 'moment';
import { toast } from 'react-toastify';
import { selectCurrentUser } from '../../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { setFlexBreadcrumb } from '../../../components/AppBreadcrumb/breadcrumbSlice';
import ConfirmPopup from '../../../components/Confirm/ConfirmPopup';

const SemesterPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllSemesterQuery();
  const [delSemester, { isLoading: delLoading }] = useDeleteSemesterMutation();
  const modalRef = React.useRef();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(
      setFlexBreadcrumb([{ title: 'Quảng lý kỳ học', path: `/manage` }]),
    );
  }, [dispatch]);

  const handleRemoveSemester = (item) => {
    delSemester(item.id)
      .unwrap()
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error('Có lỗi xảy ra'));
  };

  const ActionContent = (item) => {
    return (
      <div className="tw-flex">
        <Tooltip title="Sửa kì học" placement="bottom" color="#FF6D28">
          <Button
            onClick={() => modalRef.current.show('EDIT', item)}
            icon={<EditOutlined className="tw-text-[20px]" />}
            className="tw-border-none tw-bg-transparent tw-shadow-none hover:tw-bg-transparent dark:tw-text-slate-400 dark:hover:tw-text-blue-500"
          />
        </Tooltip>
        <Tooltip title="Xóa kì học" placement="bottom" color="#FF6D28">

        <ConfirmPopup content={<Button
              loading={delLoading}
              icon={<DeleteOutlined className="tw-text-[20px]" />}
              className="tw-border-none tw-bg-transparent tw-shadow-none hover:tw-bg-transparent dark:tw-text-slate-400 dark:hover:tw-text-blue-500"
            />}
          title="Bạn có chắc chắn muốn xóa kì học này?"
          onConfirm={() => handleRemoveSemester(item)}
         />
          </Tooltip>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Kỳ học</title>
      </Helmet>
      {error && (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      )}

      <div>
        {currentUser.role_id === 1 && (
          <>
            <div className="tw-absolute tw-right-[5%] -tw-mt-4 md:tw-right-[2%] ">
              <Button
                className="hover:tw-bg-orange-00 tw-flex tw-items-center tw-rounded-md tw-border tw-border-transparent tw-bg-orange-400  tw-px-2 tw-text-slate-100 dark:tw-border dark:tw-border-white  dark:tw-bg-transparent  "
                type="primary"
                onClick={() => modalRef.current.show('ADD')}
              >
                <div className="tw-flex tw-items-center ">
                  <PlusCircleOutlined className="tw-mr-1" /> Thêm kỳ học
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
      <Spinner
        loading={isLoading}
        size="large"
        className={
          'tw-my-auto tw-mt-10 tw-flex tw-min-h-[200px] tw-items-center tw-justify-center'
        }
      />
      {data && (
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-400   tw-mx-4 tw-my-6  tw-rounded-[3px] tw-border tw-transition-all hover:tw-border-gray-400 hover:tw-opacity-[90%] dark:tw-border-gray-500 dark:hover:tw-border-white"
            >
              <div>
                <Link
                  state={{
                    semesterStartTime: item.start_time,
                    semesterEndTime: item.end_time,
                    semesterId: item.id,
                  }}
                  to={`/manage/sem/${item.id}`}
                >
                  <img
                    className="tw-w-full tw-rounded-t-[3px]"
                    src={Img1}
                    alt=""
                  />
                </Link>
              </div>
              <div className="tw-flex tw-w-full tw-items-center tw-justify-between">
                <div>
                  <Link
                    state={{
                      semesterStartTime: item.start_time,
                      semesterEndTime: item.end_time,
                      semesterId: item.id,
                    }}
                    className="tw-w-full   tw-pl-2 tw-text-[16px] tw-font-medium  tw-text-black hover:tw-text-amber-500 dark:tw-text-slate-200 dark:hover:tw-text-[#ffa500]"
                    to={`/manage/sem/${item.id}`}
                  >
                    {item.name}
                  </Link>
                  <div className="tw-px-2">
                    <p className="tw-mb-1 tw-text-xs tw-text-gray-600 ">
                      {item.start_time
                        ? moment(item.start_time).format('DD/MM/YY')
                        : ''}{' '}
                      -{' '}
                      {item.end_time
                        ? moment(item.end_time).format('DD/MM/YY')
                        : ''}
                    </p>
                  </div>
                </div>
                {currentUser?.role_id === 1 && (
                  <>
                    <div>
                      <Popover
                        placement="bottomRight"
                        content={ActionContent(item)}
                        trigger="focus"
                      >
                        <Button className="tw-border-0 tw-shadow-none hover:tw-bg-transparent dark:tw-bg-[#202125] dark:tw-text-white dark:hover:tw-text-blue-500">
                          <SettingOutlined />
                        </Button>
                      </Popover>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <FormSemeterRef ref={modalRef} />
    </>
  );
};

export default SemesterPage;
