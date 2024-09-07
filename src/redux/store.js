import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import UserReducer from './user/userSlice'
import ProductReducer from './product/productSlice'
import OrderReducer from './order/orderSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product', 'counter', 'user']
}

const rootReducer = combineReducers({
  counter: counterReducer,
  user: UserReducer,
  product: ProductReducer,
  order: OrderReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => 
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)