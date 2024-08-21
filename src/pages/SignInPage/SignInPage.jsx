import React from 'react'
import { WrapperHeaderAuth, HeaderAuth, HeaderLogo, Logo, NeedHelp, WrapperBodyAuth, BodyAuth, Help, OtherWay, SignUpByOtherWay, ChangeState } from './style'
import facebook from '../../assets/svg/facebook.svg'
import google from '../../assets/svg/google.svg'

import FooterComponent from '../../components/FooterComponent/FooterComponent'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const SpanFooter = [6, 6, 6, 6]

const SignInPage = () => {
  return (
    <div>
      <WrapperHeaderAuth>
        <HeaderAuth>
          <HeaderLogo>
            <Logo>PEIGUIN BOOK CORNER</Logo>
            <div style={{ fontSize: '24px' }}>Đăng nhập</div>
          </HeaderLogo>
          <NeedHelp>Bạn cần giúp đỡ?</NeedHelp>
        </HeaderAuth>
      </WrapperHeaderAuth>
      <WrapperBodyAuth>
        <BodyAuth>
          <div style={{ fontSize: '20px', padding: '22px 0px' }}>Đăng nhập</div>
          <InputForm style={{marginBottom: '10px', height: '40px'}} placeholder="abc@gmail.com"/>
          <InputForm style={{marginBottom: '10px', height: '40px'}} placeholder="Password" type="password"/>
          <ButtonComponent
            bordered={false}
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
          <ChangeState>Bạn chưa có tài khoản? <a href='/'>Tạo tài khoản</a></ChangeState>
        </BodyAuth>
      </WrapperBodyAuth>
      <FooterComponent span={SpanFooter}/>
    </div>
  )
}

export default SignInPage