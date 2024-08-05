import React from 'react'
import { Col } from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperHeader, WrapperTextHeader, WrapperSearchHeader, SearchWrapper, WrapperHeaderAccount, HeaderButton } from './style'
import UndertakeComponent from '../UndertakeComponent/UndertakeComponent';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>
                        PENGUINBOOKCORNER
                    </WrapperTextHeader>
                </Col>
                <Col span={12}>    
                    <WrapperSearchHeader>
                        <SearchWrapper placeholder="Input search text" enterButton />
                    </WrapperSearchHeader>
                </Col>
                <Col span={6}>
                    <WrapperHeaderAccount>
                        <HeaderButton type="text" block>
                            <UserOutlined />
                            <span>Tài khoản</span>
                        </HeaderButton>
                        <HeaderButton type="text" block>
                            <ShoppingCartOutlined />
                            <span>Giỏ hàng</span>
                        </HeaderButton>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
            <UndertakeComponent />
        </div>
    )
}

export default HeaderComponent