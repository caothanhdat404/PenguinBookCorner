import React, { useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { WrapperHeaderAuth, HeaderAuth, HeaderLogo, Logo, NeedHelp, WrapperBodyAuth, BodyAuth, Help, OtherWay, SignUpByOtherWay, WrapperBrandIcon, BrandIcon, ChangeState } from './style'
import facebook from '../../assets/svg/facebook.svg'
import google from '../../assets/svg/google.svg'

import FooterComponent from '../../components/FooterComponent/FooterComponent'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import Loading from '../../components/LoadingComponent/Loading'

import { useMutationHook } from '../../hooks/useMutationHook'

import * as UserService from '../../services/UserService'

import { updateUser } from '../../redux/user/userSlice'

const SpanFooter = [6, 6, 6, 6]

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )

  const { data, isPending, isSuccess } = mutation

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  return (
    <div>
      <WrapperHeaderAuth>
        <HeaderAuth>
          <HeaderLogo>
            <Logo to='/'>PEIGUIN BOOK CORNER</Logo>
            <div style={{ fontSize: '24px' }}>Đăng nhập</div>
          </HeaderLogo>
          <NeedHelp>Bạn cần giúp đỡ?</NeedHelp>
        </HeaderAuth>
      </WrapperHeaderAuth>
      <WrapperBodyAuth>
        <BodyAuth>
          <div style={{ fontSize: '20px', padding: '22px 0px' }}>Đăng nhập</div>
          <InputForm style={{ marginBottom: '10px', height: '40px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span style={{ zIndex: 100, position: 'absolute', top: '15px', right: '8px' }}
              onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm style={{ height: '40px' }} placeholder="Password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={email === '' || password === ''}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(26, 148, 255)',
                height: '40px',
                width: '100%',
                marginTop: '30px',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
              }}
            ></ButtonComponent>
          </Loading>
          <Help>
            <div>Quên mật khẩu</div>
            <div>Đăng nhập với SMS</div>
          </Help>
          <OtherWay>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(0,0,0,.26)' }}>
              <div style={{ width: '170px', height: '1px', backgroundColor: 'rgba(0,0,0,.26)' }}></div>
              <div>hoặc</div>
              <div style={{ width: '170px', height: '1px', backgroundColor: 'rgba(0,0,0,.26)' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
              <SignUpByOtherWay>
                <WrapperBrandIcon>
                  <BrandIcon src={facebook}></BrandIcon>
                </WrapperBrandIcon>
                <div>Facebook</div>
              </SignUpByOtherWay>
              <SignUpByOtherWay>
                <WrapperBrandIcon>
                  <BrandIcon src={google}></BrandIcon>
                </WrapperBrandIcon>
                <div>Google</div>
              </SignUpByOtherWay>
            </div>
          </OtherWay>
          <ChangeState>Bạn chưa có tài khoản? <Link to='/sign-up'>Tạo tài khoản</Link></ChangeState>
        </BodyAuth>
      </WrapperBodyAuth>
      <FooterComponent span={SpanFooter} />
    </div>
  )
}

export default SignInPage