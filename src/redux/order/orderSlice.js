import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  selectedOrderItems: [],
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
      const itemOrderSelected = state?.selectedOrderItems?.find((item) => item?.product === idProduct)
      itemOrder.amount++
      itemOrderSelected.amount++
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.selectedOrderItems?.find((item) => item?.product === idProduct)
      itemOrder.amount--
      itemOrderSelected.amount--
    },
    removeOrder: (state, action) => {
        const { idProduct } = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
        const itemOrderSelected = state?.selectedOrderItems?.find((item) => item?.product !== idProduct)
        state.orderItems = itemOrder
        state.selectedOrderItems = itemOrderSelected
        
    },
    removeAllOrder: (state, action) => {
      const { listChecked } = action.payload
      const itemOrder = state?.orderItems?.find((item) => !listChecked.includes(item.product))
      const itemOrderSelected = state?.orderItems?.find((item) => !listChecked.includes(item.product))
      state.orderItems = itemOrder
      state.selectedOrderItems = itemOrderSelected
    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload
      const orderSelected = []
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order)
        }
      })
      state.selectedOrderItems = orderSelected
    }
  },
})

export const { addOrder, increaseAmount, decreaseAmount, removeOrder, removeAllOrder, selectedOrder } = orderSlice.actions

export default orderSlice.reducer