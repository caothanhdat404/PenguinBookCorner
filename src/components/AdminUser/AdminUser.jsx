import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ margin: '20px 0' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '4px', borderStyle: 'dashed' }}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div>
        <TableComponent />
      </div>
    </div>
  )
}

export default AdminUser