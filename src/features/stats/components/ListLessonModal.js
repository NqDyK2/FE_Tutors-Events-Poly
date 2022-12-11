import { Modal, Table } from 'antd'
import moment from 'moment';
import React, { forwardRef, useImperativeHandle } from 'react'

const ListLessonModal = (props, ref) => {
  const [visible, setVisible] = React.useState(false);

  const [data, setData] = React.useState([])

  const [title, setTitle] = React.useState('Lịch sử môn học')

  useImperativeHandle(ref, () => ({
    show: (data = []) => {
      setData(data)
      setTitle(`Lịch sử môn học ${data?.subject ?? ''}`)
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
              title: 'Ngày',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Giảng viên',
              dataIndex: 'teacher_email',
              key: 'teacher_email',
            },
            {
              title: 'Trợ giảng',
              dataIndex: 'tutor_email',
              key: 'tutor_email',
            }

          ]
          }
          dataSource={
            data?.data?.map((item, index) => ({
              ...item,
              key: index + 1,
              time: `
              ${moment(item?.start_time).format('DD/MM/YYYY HH:mm')} -  ${moment(item?.end_time).format('DD/MM/YYYY HH:mm')}`
            }))
          }
          pagination={false}
          rowKey="key"
        />
      </Modal>
    </>
  )
}

export default forwardRef(ListLessonModal)