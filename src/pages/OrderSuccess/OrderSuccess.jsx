import React from 'react'
import { WrapperContainer, WrapperInfo, Label, WrapperValue, WrapperOrderItemInfo, WrapperItemOrder } from './style'
import { useSelector } from 'react-redux'
import { convertPrice } from '../../utils'
import { useLocation } from 'react-router-dom'
import { orderConstant } from '../../constant'

const OrderSuccess = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const { state } = location

  return (
    <div style={{ background: "#f5f5fa", width: '100%', height: '100vh', padding: '116px 64px 0' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Đơn hàng đã đặt thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderConstant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label>Phương thức thanh toán</Label>
                <WrapperValue>
                  {orderConstant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperOrderItemInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{ width: '260px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                      </span>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperOrderItemInfo>
            <div>
              <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(order?.totalPrice)}</span>
            </div>
          </WrapperContainer>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess