import { Row, Col, Rate } from 'antd'
import React from 'react'
import SliderComponent from '../SliderComponent/SliderComponent'
import { WrapperNameProduct, TextSell, PriceProduct, PriceTextProduct, AddressCustomer, QualityProduct, WrapperInputNumber } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import imageProduct from '../../assets/images/fullproductImg.webp'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import bookmark from '../../assets/images/bookmark.webp'
import bookmarks from '../../assets/images/bookmarks.webp'
import tikibookmark from '../../assets/images/tikibookmark.webp'
import wabookmark from '../../assets/images/wabookmark.webp'

import * as ProductService from '../../services/ProductService'

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../redux/counter/counterSlice';
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrder } from '../../redux/order/orderSlice'
import { convertPrice } from '../../utils'

const ProductDetailsComponent = ({ idProduct }) => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)

    const user = useSelector((state) => state.user)

    const navigate = useNavigate()
    const location = useLocation()

    const fetchDetailProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailProduct(id)
            return res.data
        } 
    }

    const { isPending, data: productDetails } = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchDetailProduct, enabled: !!idProduct })


    const handleOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            dispatch(addOrder({
                orderItems: {
                    name: productDetails?.name,
                    amount: count,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?.id
                }
            }))
        }
    }
    
    return (
        <Row style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', height: '80%' }} >
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <SliderComponent arrImages={[imageProduct, imageProduct, bookmark, bookmarks, tikibookmark, wabookmark]} option={1} />
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperNameProduct>{productDetails?.name}</WrapperNameProduct>
                <div>
                    <Rate allowHalf disabled value={productDetails?.rating}/>
                    <TextSell> | Đã bán {productDetails?.sold} +</TextSell>
                    <PriceProduct>
                        <PriceTextProduct>
                            {convertPrice(productDetails?.price)}
                        </PriceTextProduct>
                    </PriceProduct>
                    <AddressCustomer>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
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
                            onClick={handleOrderProduct}
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