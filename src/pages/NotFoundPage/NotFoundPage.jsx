import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundPageWrapper, ImgWrapper, NotFoundImg, NotFoundText, NotFoundBtn } from './style'

const NotFoundPage = () => {
  return (
    <NotFoundPageWrapper>
      <ImgWrapper>
        <NotFoundImg src='https://salt.tikicdn.com/ts/brickv2og/3c/7c/9b/1d101c4757843340d812828590283374.png' alt='Not Found 404'></NotFoundImg>
      </ImgWrapper>
      <NotFoundText>Trang bạn đang tìm kiếm không tồn tại</NotFoundText>
      <NotFoundBtn type="primary">
        <Link to='/'>
          Tiếp Tục Mua Sắm
        </Link>
      </NotFoundBtn>
    </NotFoundPageWrapper>
  )
}

export default NotFoundPage
