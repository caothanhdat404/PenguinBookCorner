import React from 'react'
import { WrapperCard, NameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText } from './style'
import { StarFilled } from '@ant-design/icons'
import fullproductImg from '../../assets/images/fullproductImg.webp'
const CardComponent = (props) => {
  const {  image, name, price, rating, discount, sold} = props

  return (
    <WrapperCard
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: '200px', height: '300px' }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt='image' src={fullproductImg} />}
    >
      <NameProduct>{name}</NameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
        </span>
        <span> | Đã bán {sold}+</span>
      </WrapperReportText>
      <WrapperPriceText>
        {price}.000đ
        <WrapperDiscountText>-{discount}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCard>
  )
}

export default CardComponent