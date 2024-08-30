import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import UserReducer from './user/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: UserReducer
  },
})