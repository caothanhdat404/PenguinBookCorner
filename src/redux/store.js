import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import UserReducer from './user/userSlice'
import ProductReducer from './product/productSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: UserReducer,
    product: ProductReducer
  },
})