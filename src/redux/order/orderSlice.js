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
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      itemOrder.amount++
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      itemOrder.amount--
    },
    removeOrder: (state, action) => {
        const { idProduct } = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
        state.orderItems = itemOrder
        
    },
    removeAllOrder: (state, action) => {
      const { listChecked } = action.payload
      const itemOrder = state?.orderItems?.find((item) => !listChecked.includes(item.product))
      state.orderItems = itemOrder
      
  }
  },
})

export const { addOrder, increaseAmount, decreaseAmount, removeOrder, removeAllOrder } = orderSlice.actions

export default orderSlice.reducer