import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Col } from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperHeader, WrapperTextHeader, WrapperSearchHeader, SearchWrapper, WrapperHeaderAccount, HeaderButton, StyleTippy, WrapperUserOption, UserOption } from './style'
import UndertakeComponent from '../UndertakeComponent/UndertakeComponent';
import Loading from '../../components/LoadingComponent/Loading'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/user/userSlice'

const HeaderComponent = () => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')

    const handleSignIn = () => {
        navigate('/sign-in')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
        navigate('/')
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setLoading(false)
    })

    return (
        <div style={{
            width: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: '1000'
        }}>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>
                        <Link to='/'>
                            PENGUINBOOKCORNER
                        </Link>
                    </WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <WrapperSearchHeader>
                        <SearchWrapper placeholder="Input search text" enterButton />
                    </WrapperSearchHeader>
                </Col>
                <Col span={6}>
                    <WrapperHeaderAccount>
                        <Loading isLoading={loading}>
                            {user?.access_token ?
                                <StyleTippy
                                    content={
                                        <WrapperUserOption>
                                            <UserOption onClick={() => navigate('/profile')}>Thông tin người dùng</UserOption>
                                            <UserOption onClick={handleLogout}>Đăng xuất</UserOption>
                                        </WrapperUserOption>
                                    }
                                    interactive={true}
                                    placement="bottom-end"
                                >
                                    <HeaderButton type="text" block>
                                        <UserOutlined />
                                        <div style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>

                                            {userName?.length ? userName : user?.email}
                                        </div>
                                    </HeaderButton>
                                </StyleTippy>

                                :
                                <HeaderButton type="text" block onClick={handleSignIn}>
                                    <UserOutlined />
                                    <div>Tài khoản</div>
                                </HeaderButton>
                            }
                        </Loading>
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