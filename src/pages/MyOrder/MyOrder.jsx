import { useQuery } from '@tanstack/react-query'
import React from 'react'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'

const MyOrder = () => {
  const user = useSelector((state) => state.user)
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(user?.id, user?.access_token)
    return res.data
  }
  const queryOrder = useQuery({ queryKey: ['order'], queryFn: fetchMyOrder }, {
    enabled: user?.id && user?.access_token 
  })
  const { isPending, data } = queryOrder
  return (
    <Loading isLoading={isPending}>
      <div style={{ background: "#f5f5fa", width: '100%', height: '100vh' }}>
        My order
      </div>
    </Loading>
  )
}

export default MyOrder