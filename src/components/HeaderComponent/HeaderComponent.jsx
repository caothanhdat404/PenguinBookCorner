import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Col } from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo/logo.png'
import { WrapperHeader, WrapperTextHeader, WrapperSearchHeader, SearchWrapper, WrapperHeaderAccount, HeaderButton, StyleTippy, WrapperUserOption, UserOption } from './style'
import UndertakeComponent from '../UndertakeComponent/UndertakeComponent';
import Loading from '../../components/LoadingComponent/Loading'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/user/userSlice'
import { searchProduct } from '../../redux/product/productSlice';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false, isHiddenUndertake = false }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')

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
        setUserAvatar(user?.avatar)
        setLoading(false)
    })

    const handleSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(search))
    }

    return (
        <div style={{
            width: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: '1000'
        }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={6}>
                    <WrapperTextHeader>
                        <Link to='/'>
                            <img src={logo} alt='Penguin Book Corner' style={{ width: '150px', height: '30px' }}></img>
                        </Link>
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={12}>
                        <WrapperSearchHeader>
                            <SearchWrapper placeholder="Input search text" enterButton onChange={handleSearch} />
                        </WrapperSearchHeader>
                    </Col>
                )}
                <Col span={6}>
                    <WrapperHeaderAccount>
                        <Loading isLoading={loading}>
                            {user?.access_token ?
                                <StyleTippy
                                    content={
                                        <WrapperUserOption>
                                            <UserOption onClick={() => navigate('/profile')}>Thông tin người dùng</UserOption>
                                            {user?.isAdmin && (
                                                <UserOption onClick={() => navigate('/system/admin')}>Quản lý hệ thống</UserOption>
                                            )}
                                            <UserOption onClick={handleLogout}>Đăng xuất</UserOption>
                                        </WrapperUserOption>
                                    }
                                    interactive={true}
                                    placement="bottom-end"
                                >
                                    <HeaderButton type="text" block>
                                        {userAvatar ? (
                                            <img src={userAvatar} alt='avatar' style={{
                                                height: '30px',
                                                width: '30px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }} />
                                        ) : <UserOutlined />}
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
                        {!isHiddenCart && (
                            <HeaderButton type="text" block onClick={() => navigate('/order')}>
                                <Badge count={order?.orderItems?.length} size='small'>
                                    <ShoppingCartOutlined style={{ color: '#fff' }}/>
                                </Badge>
                                <span>Giỏ hàng</span>
                            </HeaderButton>

                        )}
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
            {!isHiddenUndertake && (<UndertakeComponent />)}
        </div>
    )
}

export default HeaderComponent