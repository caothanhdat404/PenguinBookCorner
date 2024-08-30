import { Row, Col } from 'antd'
import React from 'react'
import SliderComponent from '../SliderComponent/SliderComponent'
import { WrapperNameProduct, TextSell, PriceProduct, PriceTextProduct, AddressCustomer, QualityProduct, WrapperInputNumber } from './style'
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import imageProduct from '../../assets/images/fullproductImg.webp'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import bookmark from '../../assets/images/bookmark.webp'
import bookmarks from '../../assets/images/bookmarks.webp'
import tikibookmark from '../../assets/images/tikibookmark.webp'
import wabookmark from '../../assets/images/wabookmark.webp'

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../redux/counter/counterSlice';

const ProductDetailsComponent = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);

    return (
        <Row style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px' }} >
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <SliderComponent arrImages={[imageProduct, imageProduct, bookmark, bookmarks, tikibookmark, wabookmark]} option={1} />
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperNameProduct>Combo Trọn Bộ CONAN ĐẶC SẮC Conan và Tổ chức Áo Đen (Tập 1, 2) + Conan Tuyển Tập Đặc Biệt - FBI Selection + Conan Tuyển Tập Fan Bình Chọn (Tập 1, 2) + Conan Những Câu Chuyện Lãng Mạn (Tập 1,2,3) - Bộ 8 Cuốn/ Tặng kèm Postcard Green Life</WrapperNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}></StarFilled>
                    <TextSell> | Đã bán 1000+</TextSell>
                    <PriceProduct>
                        <PriceTextProduct>200.000</PriceTextProduct>
                    </PriceProduct>
                    <AddressCustomer>
                        <span>Giao đến </span>
                        <span className='address'>Q. 1, P. Bến Nghé, Hồ Chí Minh</span> -
                        <span className='change-address'> Đổi địa chỉ</span>
                    </AddressCustomer>
                    <div style={{ margin: '10px 0 20px 0', paddingTop: '10px', borderTop: '1px solid #e5e5e5' }}>
                        <div>Số lượng</div>
                        <QualityProduct>
                            <button onClick={() => dispatch(decrement())}>
                                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                            </button>
                            <WrapperInputNumber value={count} size='small' readOnly />
                            <button onClick={() => dispatch(increment())}>
                                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                            </button>
                        </QualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(26, 148, 255)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Chọn mua'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>

                        <ButtonComponent
                            size={40}
                            styleButton={{
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(26, 148, 255)',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua trả sau'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent