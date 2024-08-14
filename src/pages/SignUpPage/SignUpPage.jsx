import React from 'react'
import { WrapperHeaderAuth, HeaderAuth, HeaderLogo, Logo, NeedHelp, WrapperBodyAuth, BodyAuth, OtherWay, Policy, ChangeState } from './style'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const SignUpPage = () => {
  return (
    <div>
      <WrapperHeaderAuth>
        <HeaderAuth>
          <HeaderLogo>
            <Logo>PEIGUIN BOOK CORNER</Logo>
            <div style={{ fontSize: '24px' }}>Đăng ký</div>
          </HeaderLogo>
          <NeedHelp>Bạn cần giúp đỡ?</NeedHelp>
        </HeaderAuth>
      </WrapperHeaderAuth>
      <WrapperBodyAuth>
        <BodyAuth>
          <div style={{ fontSize: '20px', padding: '22px 0px' }}>Đăng ký</div>
          <InputForm />
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: 'rgb(26, 148, 255)',
              height: '40px',
              width: '100%',
              margin: '30px 0',
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
          <OtherWay>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',fontSize: '12px', color: 'rgba(0,0,0,.26)' }}>
              <div style={{ width: '170px', height: '1px', backgroundColor: 'rgba(0,0,0,.26)' }}></div>
              <div>hoặc</div>
              <div style={{ width: '170px', height: '1px', backgroundColor: 'rgba(0,0,0,.26)' }}></div>
            </div>
            <div></div>
          </OtherWay>
          <Policy>Bằng việc đăng ký, bạn đã đồng ý với chúng tôi về<br></br><a href='/'>Điều khoản dịch vụ</a> & <a href=''>Chính sách bảo mật</a></Policy>
          <ChangeState>Bạn đã có tài khoản <a href='/'>Đăng nhập</a></ChangeState>
        </BodyAuth>
      </WrapperBodyAuth>
      <FooterComponent />
    </div>
  )
}

export default SignUpPage