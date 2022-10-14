import { Popconfirm } from 'antd'
import React from 'react'

const ConfirmPopup = (
  {content, title, onConfirm, ...props}
) => {
  return (
    <Popconfirm 
      title={title}
      onConfirm={onConfirm}
      okText={'OK'}
      cancelText="Không"
      okButtonProps={{
        type: 'primary',
        className: 'tw-bg-green-600 tw-border-0 tw-px-4 hover:tw-bg-green-500 focus:tw-bg-green-500'
      }}
      cancelButtonProps={{
        className: 'hover:tw-bg-gray-100 focus:tw-bg-gray-100'
      }}
      {...props}
    >
      <p>
        {content}
      </p>
    </Popconfirm>
  )
}

export default ConfirmPopup