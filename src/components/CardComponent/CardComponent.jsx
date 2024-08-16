import React from 'react'
import { WrapperCard, NameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText } from './style'
import { StarFilled } from '@ant-design/icons'
import fullproductImg from '../../assets/images/fullproductImg.webp'
const CardComponent = () => {
  return (
    <WrapperCard
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: '200px', height: '300px' }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt='example' src={fullproductImg} />}
    >
      <NameProduct>Conan</NameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>4.95 </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
        </span>
        <span> | Đã bán 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        200.000đ
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCard>
  )
}

export default CardComponent