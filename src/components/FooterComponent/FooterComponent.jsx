import React from 'react'
import { WrapperFooter, TagFooter, Tag, NavFooter, Payment } from './style'
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'


const FooterComponent = () => {
  return (
    <WrapperFooter>
        <TagFooter span={6}>
          <Tag>
            Liên hệ
          </Tag>
          <div style={{marginBottom: '12px'}}>
            <EnvironmentOutlined style={{color: 'rgb(26, 148, 255)', marginRight: '8px'}} />
            Số 404, Sơn Tây, Ba Ngòi, Cam Ranh, Khách Hòa
          </div>
          <NavFooter>
            <MailOutlined style={{color: 'rgb(26, 148, 255)', marginRight: '8px'}} />
            info@pbc.vn
          </NavFooter>
          <NavFooter>
            <PhoneOutlined style={{color: 'rgb(26, 148, 255)', marginRight: '8px'}} />
            0777242105
          </NavFooter>
        </TagFooter>
        <TagFooter span={6}>
          <Tag>
            Giới thiệu
          </Tag>
          <NavFooter>Về cửa hàng</NavFooter>
          <NavFooter>Hệ thống hiệu sách</NavFooter>
          <NavFooter>Tuyển dụng</NavFooter>
        </TagFooter>
        <TagFooter span={6}>
          <Tag>
            Chính sách
          </Tag>
          <NavFooter>Chính sách bảo mật</NavFooter>
          <NavFooter>Chính sách đổi trả/hoàn tiền</NavFooter>
          <NavFooter>Chính sách thanh toan/vận chuyển</NavFooter>
        </TagFooter>
        <TagFooter span={6}>
          <Tag>
            Phương tiện thanh toán
          </Tag>
          <Payment>
            <img src='https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/payment_method.png?1704690471681' alt='payments'></img>
          </Payment>
          <Payment>
            <img src='https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/bocongthuong.png?1704690471681' alt=''></img>
          </Payment>
        </TagFooter>
    </WrapperFooter>
  )
}

export default FooterComponent