import { Button, Dropdown, Menu } from 'antd';
import moment from 'moment';
import React from 'react'
import { exportExcel, exportPdf } from '../../utils/exportFile';

const ExportDropDown = ({
  tableEl,
  data,
  sheetName = "Sheet",
  fileName = "",
}) => {
  const exportTableExcel = () => {
    exportExcel(tableEl, sheetName, `${fileName} ${data?.tree[0]?.name} ${moment(new Date()).format('DD-MM-YYYY')}`.trim());
  }

  const exportTalePdf = () => {
    const table = document.getElementsByTagName('table')[0];
    exportPdf(table, `${fileName} ${data?.tree[0]?.name} ${moment(new Date()).format('DD-MM-YYYY')}`.trim());
  }
  return (
    <Dropdown
      className='tw-hidden'
      overlay={
        <Menu
          className="tw-bg-white dark:tw-bg-slate-900"
          items={[
            {
              key: '1',
              title: 'Excel',
              label: 'Excel',
              onClick: exportTableExcel,
            },
            {
              key: '2',
              title: 'PDF',
              label: 'PDF',
              onClick: exportTalePdf,
            }
          ]}
        />
      }
      trigger={['click']}
    >
      <Button
        className="tw-flex tw-items-center tw-rounded-md tw-border-2 tw-px-2 tw-text-blue-500 hover:tw-bg-transparent hover:tw-text-blue-600 dark:tw-text-slate-100 dark:hover:tw-text-blue-500"
        type="link"
      >
        Export
      </Button>
    </Dropdown>
  )
}

export default ExportDropDown