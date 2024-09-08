import React, { useEffect, useMemo, useState } from 'react'
import { Form, Radio } from 'antd'
import { WrapperLeft, WrapperRight, WrapperInfo, WrapperTotal, Label, WrapperRadio } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import * as message from '../../components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/user/userSlice'
import { convertPrice } from '../../utils'
import { useMutationHook } from '../../hooks/useMutationHook'

import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [isOpenModalUpdateInfo, setIsOpenUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [form] = Form.useForm()

  const priceMemo = useMemo(() => {
    const result = order?.selectedOrderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const deliveryFeeMemo = useMemo(() => {
    if (priceMemo > 100) {
      return 10
    } else {
      return 0
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return priceMemo + deliveryFeeMemo
  }, [priceMemo, deliveryFeeMemo])


  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        name: user?.name,
        phone: user?.phone,
        address: user?.address
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleAddOrder = () => {
    if (user?.access_token && order?.selectedOrderItems && user?.name && user?.address && user?.phone && priceMemo, user?.id) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.selectedOrderItems,
        fullName: user?.name, address: user?.address, phone: user?.phone,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryFeeMemo,
        totalPrice: totalPriceMemo,
        user: user?.id
      })
    }
  }

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      phone: '',
      address: ''
    })
    // form.resetFields()
    setIsOpenUpdateInfo(false)
  }

  const handleOnChangeDetail = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const mutationUpdate = useMutationHook(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      return res
    }
  )

  const mutationAddOrder = useMutationHook(
    (data) => {
      const { token, ...rests } = data
      const res = OrderService.createOrder({ ...rests }, token)
      return res
    }
  )

  const { data, isSuccess, isError } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Đặt hàng thành công')
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleUpdateInfoUser = () => {
    const { name, address, phone } = stateUserDetails
    if (name && address && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, phone }))
          setIsOpenUpdateInfo(false)
        }
      })
    }
  }

  const handleChangeAddress = () => {
    setIsOpenUpdateInfo(true)
  }

  return (
    <div style={{ background: "#f5f5fa", width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Thanh toán</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức giao hàng</Label>
                <WrapperRadio value={delivery}>
                  <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                  <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO JEK</span> Giao hàng tiết kiệm</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức thanh toán</Label>
                <WrapperRadio value={payment}>
                  <Radio value="later"> Thanh toán tiền mặt khi nhận hàng</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Giao đến: </span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{user?.address}</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 %</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryFeeMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rbg(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Đặt hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}
            />
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          // onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name',
              },
            ]}
          >
            <Input value={stateUserDetails.name} onChange={handleOnChangeDetail} name="name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number',
              },
            ]}
          >
            <Input value={stateUserDetails.phone} onChange={handleOnChangeDetail} name="phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address',
              },
            ]}
          >
            <Input value={stateUserDetails.address} onChange={handleOnChangeDetail} name="address" />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default PaymentPage