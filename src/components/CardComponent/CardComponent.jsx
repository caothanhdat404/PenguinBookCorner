import React from 'react'
import { WrapperCard, NameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText } from './style'
import { StarFilled } from '@ant-design/icons'
const CardComponent = (props) => {
  const { image, name, price, rating, discount, sold } = props

  return (
    <WrapperCard
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: '180px', height: '300px' }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt='image' src={image} />}
    >
      <NameProduct>{name}</NameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
        </span>
        <span> | Đã bán {sold}+</span>
      </WrapperReportText>
      <WrapperPriceText>
        {Number(price*1000).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
        <WrapperDiscountText>-{discount}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCard>
  )
}

export default CardComponent