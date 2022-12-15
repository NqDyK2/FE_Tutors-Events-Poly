import { Modal, Table } from 'antd';
import moment from 'moment';
import React, { forwardRef, useImperativeHandle } from 'react'

const TeacherStatModal = (prop, ref) => {
  const [visible, setVisible] = React.useState(false);

  const [data, setData] = React.useState([])

  const [title, setTitle] = React.useState('Giảng viên')

  useImperativeHandle(ref, () => ({
    show: (data = []) => {
      setData(data)
      setVisible(true);
    },

    hide: () => {
      setVisible(false);
    }

  }));

  return (
    <>
      <Modal title={title}
        open={visible}
        okType="default"
        destroyOnClose
        okText="OK"
        getContainer={false}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

        }}
        okButtonProps={{
          className:
            'tw-bg-sky-400 tw-text-slate-100 hover:tw-bg-sky-500 tw-border-none',
        }}
        cancelButtonProps={{ className: 'tw-hidden' }}
        width={'80%'}

      >
        <Table
          scroll={{ y: 600 }}
          columns={[
            {
              title: 'STT',
              dataIndex: 'key',
              key: 'key',
            },
            {
              title: 'Giảng viên',
              dataIndex: 'email',
              key: 'email',
            },
            Table.EXPAND_COLUMN,
            {
              title: 'Buổi học',
              dataIndex: 'lessons_count',
              key: 'lessons_count',

            },
            {
              title: 'Số giờ dạy',
              dataIndex: 'working_minutes',
              key: 'working_minutes',
              render: (value) => {
                return `${moment.duration(value, 'minutes').asHours().toFixed(2) ?? 0} h`
              }
            }

          ]
          }
          dataSource={
            data?.map((item, index) => ({
              ...item,
              key: index + 1,
            }))
          }
          expandable={{
            expandedRowRender: (record) => {
              return <Table
                className="tw-py-6 tw-overflow-x-hidden"
                columns={
                  [
                    {
                      title: 'STT',
                      dataIndex: 'key',
                      key: 'key',
                    },
                    {
                      title: 'Ngày',
                      dataIndex: 'time',
                      key: 'time',
                    },
                    {
                      title: 'Môn',
                      dataIndex: 'subject',
                      key: 'subject',
                      render: (value) => {
                        return `${value?.name} - ${value?.code}`
                      }
                    },
                    {
                      title: 'Sinh viên tham gia',
                      dataIndex: 'joinned_students_count',
                      key: 'joinned_students_count',
                    },
                    {
                      title: 'Trợ giảng',
                      dataIndex: 'tutor_email',
                      key: 'tutor_email',
                    }
                  ]
                }
                dataSource={
                  record?.lesons?.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    time: `
              ${moment(item?.start_time).format('DD/MM/YYYY HH:mm')} -  ${moment(item?.end_time).format('DD/MM/YYYY HH:mm')}`
                  }))
                }
                pagination={false}
              />
            },
          }}
          pagination={false}
          rowKey="key"
        />
      </Modal>
    </>
  )
}

export default forwardRef(TeacherStatModal)