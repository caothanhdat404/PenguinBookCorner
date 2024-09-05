import React, { useEffect, useState } from 'react'
import { WrapperProfile, WrapperHeaderProfile, Container, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/user/userSlice'

import * as UserService from '../../services/UserService'

import { useMutationHook } from '../../hooks/useMutationHook'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState(user?.email)
  const [name, setName] = useState(user?.name)
  const [phone, setPhone] = useState(user?.phone)
  const [address, setAddress] = useState(user?.address)
  const [avatar, setAvatar] = useState(user?.avatar)

  const dispatch = useDispatch()

  const mutation = useMutationHook(
    (data) => {
      const { id, access_token, ...rests } = data
      UserService.updateUser(id, rests, access_token)
    }
  )
  const { isPending, isSuccess, isError } = mutation

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleGetDetailsUser(user?.id, user?.access_token)
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])


  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleOnchangeName = (e) => {
    setName(e.target.value)
  }
  const handleOnchangePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
      file.status = 'done'
    }
    setAvatar(file.preview)
  }

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
  }


  return (
    <WrapperProfile>
      <WrapperHeaderProfile>
        Thông tin tài khoản
      </WrapperHeaderProfile>
      <Loading isLoading={isPending}>
        <Container>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email:</WrapperLabel>
            <InputForm style={{ width: '500px' }} id="email" value={email} onChange={handleOnchangeEmail} type="" />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                background: 'transparent',
                height: '30px',
                width: '80px',
                border: 'solid 1px rgb(26, 148, 255)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Thay đổi'}
              styleTextButton={{
                color: 'rgb(26, 148, 255)',
                fontSize: '14px',
                fontWeight: '500',
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Họ và Tên:</WrapperLabel>
            <InputForm style={{ width: '500px' }} id="name" value={name} onChange={handleOnchangeName} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                background: 'transparent',
                height: '30px',
                width: '80px',
                border: 'solid 1px rgb(26, 148, 255)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Thay đổi'}
              styleTextButton={{
                color: 'rgb(26, 148, 255)',
                fontSize: '14px',
                fontWeight: '500',
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Số điện thoại:</WrapperLabel>
            <InputForm style={{ width: '500px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                background: 'transparent',
                height: '30px',
                width: '80px',
                border: 'solid 1px rgb(26, 148, 255)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Thay đổi'}
              styleTextButton={{
                color: 'rgb(26, 148, 255)',
                fontSize: '14px',
                fontWeight: '500',
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Địa chỉ:</WrapperLabel>
            <InputForm style={{ width: '500px' }} id="address" value={address} onChange={handleOnchangeAddress} />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                background: 'transparent',
                height: '30px',
                width: '80px',
                border: 'solid 1px rgb(26, 148, 255)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Thay đổi'}
              styleTextButton={{
                color: 'rgb(26, 148, 255)',
                fontSize: '14px',
                fontWeight: '500',
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn tệp</Button>
            </WrapperUploadFile>
            
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                background: 'transparent',
                height: '30px',
                width: '80px',
                border: 'solid 1px rgb(26, 148, 255)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Thay đổi'}
              styleTextButton={{
                color: 'rgb(26, 148, 255)',
                fontSize: '14px',
                fontWeight: '500',
              }}
            ></ButtonComponent>
          </WrapperInput>
        </Container>
      </Loading>
    </WrapperProfile>
  )
}

export default Profile