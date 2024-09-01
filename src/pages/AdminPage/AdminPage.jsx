import React, { useState } from 'react'
import { Col } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'
import { WrapperAdminPage } from './style'

const items = [
  {
    key: 'user',
    label: 'Người dùng',
    icon: <UserOutlined />
  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: <MailOutlined />
  }
]

const AdminPage = () => {

  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      default:
        return <div>
          Quản lý hệ thống
        </div>
    }
  }

  const handleDataFromChild = (childData) => {
    setKeySelected(childData)
  }

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart isHiddenUndertake />
      <WrapperAdminPage>
        <Col span={4}>
          <div style={{ height: '100%' }}>
            <div style={{ borderRight: 'solid 1px #ccc', height: '100%' }}>
              <NavbarComponent items={items} sendData={handleDataFromChild} />
            </div>
          </div>
        </Col>
        <Col span={20}>
          <div style={{ padding: '15px'}}>
            {renderPage(keySelected)}
          </div>
        </Col>
      </WrapperAdminPage>
    </>
  )
}

export default AdminPage