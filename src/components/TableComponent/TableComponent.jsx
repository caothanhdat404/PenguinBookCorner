import { Table } from 'antd'
import React, { useState } from 'react'
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   name: record.name,
    // }),
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div style={{ color: 'rgb(26, 148, 255)', fontWeight: 'bold', padding: '10px', cursor: 'pointer' }} onClick={handleDeleteAll}>Xóa tất cả</div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent