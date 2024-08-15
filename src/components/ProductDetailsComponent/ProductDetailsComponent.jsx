import { Row, Col, Image } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/fullproductImg.webp'
import imageSmallProduct from '../../assets/images/smallproductImg.webp'
import { WrapperSmallImgCol, WrapperNameProduct, TextSell, PriceProduct, PriceTextProduct, AddressCustomer } from './style'
import { StarFilled } from '@ant-design/icons'

const ProductDetailsComponent = () => {
    return (
        <Row style={{ padding: '16px', backgroundColor: 'white' }}>
            <Col span={10}>
                <Image src={imageProduct} alt='image product' preview={false} />
                <Row style={{ paddingTop: '10px' }}>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                    <WrapperSmallImgCol span={4}>
                        <Image src={imageSmallProduct} alt='image small product' preview={false} height={64} width={64} />
                    </WrapperSmallImgCol>
                </Row>
            </Col>
            <Col span={14}>
                <WrapperNameProduct>Combo Trọn Bộ CONAN ĐẶC SẮC Conan và Tổ chức Áo Đen (Tập 1, 2) + Conan Tuyển Tập Đặc Biệt - FBI Selection + Conan Tuyển Tập Fan Bình Chọn (Tập 1, 2) + Conan Những Câu Chuyện Lãng Mạn (Tập 1,2,3) - Bộ 8 Cuốn/ Tặng kèm Postcard Green Life</WrapperNameProduct>
                <div>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253, 216, 54)'}}></StarFilled>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253, 216, 54)'}}></StarFilled>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253, 216, 54)'}}></StarFilled>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253, 216, 54)'}}></StarFilled>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253, 216, 54)'}}></StarFilled>
                    <TextSell> | Đã bán 1000+</TextSell>
                    <PriceProduct>
                        <PriceTextProduct>200.000</PriceTextProduct>
                    </PriceProduct>
                    <AddressCustomer>
                        <span>Giao đến </span>
                        <span className='address'>Q. 1, P. Bến Nghé, Hồ Chí Minh</span> - 
                        <span className='change-address'> Đổi địa chỉ</span>
                    </AddressCustomer>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent