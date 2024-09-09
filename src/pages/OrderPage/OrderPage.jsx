import React, { useEffect, useMemo, useState } from 'react'
import { Checkbox, Form } from 'antd'
import { WrapperDelivery, WrapperHeader, WrapperLeft, WrapperListOrder, WrapperItemOrder, WrapperPriceDiscount, WrapperCountOrder, WrapperRight, WrapperInfo, WrapperTotal } from './style'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import image from '../../assets/images/fullproductImg.webp'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import * as message from '../../components/Message/Message'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseAmount, increaseAmount, removeAllOrder, removeOrder, selectedOrder } from '../../redux/order/orderSlice'
import { updateUser } from '../../redux/user/userSlice'
import { convertPrice } from '../../utils'
import { useMutationHook } from '../../hooks/useMutationHook'

import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import Step from '../../components/StepComponent/StepComponent'

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [listChecked, setListChecked] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModalUpdateInfo, setIsOpenUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const [form] = Form.useForm()

  const handleCheck = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  }

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }))
    } else if (type === 'decrease') {
      dispatch(decreaseAmount({ idProduct }))
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrder({ idProduct }))
  }

  const handleDeleteAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrder({ listChecked }))
    }
  }

  const priceMemo = useMemo(() => {
    const result = order?.selectedOrderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const deliveryFeeMemo = useMemo(() => {
    let deliveryFee = priceMemo * 0.1;
    if (priceMemo >= 149 && priceMemo < 299) {
      if (deliveryFee > 15) {
        return (deliveryFee - 15)
      } else {
        return 0
      }
    } else if (priceMemo > 299) {
      if (deliveryFee > 30) {
        return (deliveryFee - 30)
      } else {
        return 0
      }
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return priceMemo + deliveryFeeMemo
  }, [priceMemo, deliveryFeeMemo])

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

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

  const handleAddCart = () => {
    if (!order?.selectedOrderItems?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user?.address) {
      setIsOpenUpdateInfo(true)
    } else {
      navigate('/payment')
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
      const res = UserService.updateUser(id, { rests }, token)
      return res
    }
  )

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

  const itemsDelivery = [
    {
      title: 'Mua',
    },
    {
      title: '149K',
      description: "Freeship 15k"
    },
    {
      title: '299K',
      description: "Freeship 30k"
    },
  ]

  const calculateCurrentPaymentRate = useMemo(() => {
    if (priceMemo >= 149 && priceMemo < 299) {
      return 1
    } else if (priceMemo >= 299) {
      return 2
    } else {
      return 0
    }
  }, [priceMemo])

  return (
    <div style={{ background: "#f5f5fa", width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperDelivery>
              <Step items={itemsDelivery} current={calculateCurrentPaymentRate}/>
            </WrapperDelivery>
            <WrapperHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleDeleteAllOrder} />
              </div>
            </WrapperHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Checkbox onChange={handleCheck} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{ width: '260px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber value={order.amount} size='small' />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: '500' }}>{convertPrice(order?.price * order?.amount)}</span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
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
              onClick={() => handleAddCart()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Mua hàng'}
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

export default OrderPage