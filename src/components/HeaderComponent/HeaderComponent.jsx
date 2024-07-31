import React from 'react'
import { Col, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { WrapperHeader, WrapperTextHeader, WrapperSearchHeader, SearchWrapper } from './style'


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
                    <div>
                        <Button type="text" block>
                            <UserOutlined />
                            <span>Tài khoản</span>
                        </Button>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent