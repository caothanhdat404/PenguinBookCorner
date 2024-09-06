import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: ''
  },
  reducers: {
    addOrder: (state, action) => {
        const { orderItem } = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
        if (itemOrder) {
            itemOrder.amount += orderItem?.amount
        } else {
            state.orderItems.push(orderItem)
        }
    },
    removeOrder: (state, action) => {
        const { idProduct } = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
        itemOrder.orderItems = itemOrder
        
    }
  },
})

export const { addOrder } = orderSlice.actions

export default orderSlice.reducer