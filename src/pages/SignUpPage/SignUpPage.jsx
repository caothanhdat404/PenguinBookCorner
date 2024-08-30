import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { WrapperHeaderAuth, HeaderAuth, HeaderLogo, Logo, NeedHelp, WrapperBodyAuth, BodyAuth, OtherWay, SignUpByOtherWay, WrapperBrandIcon, BrandIcon, Policy, ChangeState } from './style'
import facebook from '../../assets/svg/facebook.svg'
import google from '../../assets/svg/google.svg'

import FooterComponent from '../../components/FooterComponent/FooterComponent'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as message from '../../components/Message/Message'
import Loading from '../../components/LoadingComponent/Loading'

import { useMutationHook } from '../../hooks/useMutationHook'

import * as UserService from '../../services/UserService'


const SpanFooter = [6, 6, 6, 6]


const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const navigate = useNavigate()

  const mutation = useMutationHook(
    data => UserService.signupUser(data)
  )

  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if(isSuccess) {
      message.success()
      navigate('/sign-in')
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
  }


  return (
    <div>
      <WrapperHeaderAuth>
        <HeaderAuth>
          <HeaderLogo>
            <Logo to='/'>PEIGUIN BOOK CORNER</Logo>
            <div style={{ fontSize: '24px' }}>Đăng ký</div>
          </HeaderLogo>
          <NeedHelp>Bạn cần giúp đỡ?</NeedHelp>
        </HeaderAuth>
      </WrapperHeaderAuth>
      <WrapperBodyAuth>
        <BodyAuth>
          <div style={{ fontSize: '20px', padding: '22px 0px' }}>Đăng ký</div>
          <InputForm style={{ marginBottom: '10px', height: '40px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail} />
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span style={{ zIndex: 10, position: 'absolute', top: '15px', right: '8px' }}
              onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm style={{ height: '40px' }} placeholder="Password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnChangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ zIndex: 10, position: 'absolute', top: '15px', right: '8px' }}
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
              {isShowConfirmPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm style={{ height: '40px' }} placeholder="Re-enter Password" type={isShowConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={email === '' || password === '' || confirmPassword === ''}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(26, 148, 255)',
                height: '40px',
                width: '100%',
                margin: '20px 0 30px',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'center'
              }}
              textButton={'Đăng ký'}
              styleTextButton={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
              }}
            ></ButtonComponent>
          </Loading>
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
          <Policy>Bằng việc đăng ký, bạn đã đồng ý với chúng tôi về<br></br><a href='/'>Điều khoản dịch vụ</a> & <a href='/'>Chính sách bảo mật</a></Policy>
          <ChangeState>Bạn đã có tài khoản? <Link to='/sign-in'>Đăng nhập</Link></ChangeState>
        </BodyAuth>
      </WrapperBodyAuth>
      <FooterComponent span={SpanFooter} />
    </div>
  )
}

export default SignUpPage