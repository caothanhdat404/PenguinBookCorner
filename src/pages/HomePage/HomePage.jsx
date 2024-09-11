import React, { useState } from "react";
import { Col } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import { WrapperHomePage, WrapperSlider, WrapperCardProduct, WrapperFooter, WrapperNavbar, WrapperSubNavbar } from './style'

import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.jpg'
import slider5 from '../../assets/images/slider5.jpg'
import slider6 from '../../assets/images/slider6.jpg'

import { ReactComponent as Literature } from '../../assets/svg/literature.svg'
import { ReactComponent as Science } from '../../assets/svg/science.svg'
import { ReactComponent as Children } from '../../assets/svg/children.svg'
import { ReactComponent as Econnomy } from '../../assets/svg/economy.svg'
import { ReactComponent as Skill } from '../../assets/svg/skill.svg'
import { ReactComponent as Comic } from '../../assets/svg/comic.svg'
import { ReactComponent as Textbook } from '../../assets/svg/textbook.svg'
import { ReactComponent as Stationery } from '../../assets/svg/stationery.svg'

import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useQuery } from "@tanstack/react-query";

import * as ProductService from '../../services/ProductService'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const NavbarItems = [
    {
        key: '1',
        label: 'VĂN HỌC',
        icon: <Literature />,
        path: 'product/van-hoc'
    },
    {
        key: '2',
        label: 'KHOA HỌC',
        icon: <Science />,
        path: 'product/khoa-hoc'
    },
    {
        key: '3',
        label: 'THIẾU NHI',
        icon: <Children />,
        path: 'product/thieu-nhi'
    },
    {
        key: '4',
        label: 'KINH TẾ',
        icon: <Econnomy />,
        path: 'product/kinh-te'
    },
    {
        key: '5',
        label: 'KỸ NĂNG',
        icon: <Skill />,
        path: 'product/ky-nang'
    },
    {
        key: '6',
        label: 'TRUYỆN TRANH',
        icon: <Comic />,
        path: 'product/truyen-tranh'
    },
    {
        key: '7',
        label: 'SGK/STK',
        icon: <Textbook />,
        path: 'product/sach-giao-khoa'
    },
    {
        key: '8',
        label: 'VĂN PHÒNG PHẨM',
        icon: <Stationery />,
        path: 'product/van-phong-pham'
    },
    {
        key: '9',
        label: 'KHÁC',
    },
];

const NavbarSubItems = [
    {
        key: '1',
        label: 'Ưu đãi thẻ, ví',
    },
    {
        key: '2',
        label: 'Mua trước trả sau',
    },
];

const SpanFooter = [5, 5, 7, 7]


const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [limit, setLimit] = useState(12)
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }
    const { isPending, data: products } = useQuery({ queryKey: ['product', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000, keepPreviousData: true })



    const handleLoadMore = () => {
        setLimit((prev) => prev + 6)
    }

    return (
        <Loading isLoading={isPending}>
            <WrapperHomePage>
                <Col span={4}>
                    <div style={{ position: 'sticky', left: 0, top: '116px' }}>
                        <WrapperNavbar>
                            <div>Danh mục</div>
                            <NavbarComponent items={NavbarItems} isNavigate />
                        </WrapperNavbar>
                        <WrapperSubNavbar>
                            <div>Tiện ích</div>
                            <NavbarComponent items={NavbarSubItems} isNavigate />
                        </WrapperSubNavbar>
                    </div>
                </Col>
                <Col span={20}>
                    <WrapperSlider>
                        <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5, slider6]} option={0} />
                    </WrapperSlider>
                    <WrapperCardProduct>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    discount={product.discount}
                                    sold={product.sold}
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperCardProduct>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonComponent
                            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                            onClick={handleLoadMore}
                            size={40}
                            styleButton={{
                                background: 'transparent',
                                height: '40px',
                                width: '120px',
                                border: 'solid 1px rgb(26, 148, 255)',
                                borderRadius: '4px',
                                textAlign: 'center',
                                marginBottom: '10px'
                            }}
                            textButton={'Xem thêm'}
                            styleTextButton={{
                                color: 'rgb(26, 148, 255)',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        ></ButtonComponent>
                    </div>
                    <WrapperFooter>
                        <FooterComponent span={SpanFooter} />
                    </WrapperFooter>
                </Col>
            </WrapperHomePage>
        </Loading>
    );
}

export default HomePage