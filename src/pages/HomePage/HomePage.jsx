import React from "react";
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
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const { isLoading, data: products } = useQuery({queryKey: ['product'], queryFn: fetchProductAll})

    return (
        <WrapperHomePage>
            <Col span={4}>
                <div style={{ position: 'sticky', left: 0, top: '116px' }}>
                    <WrapperNavbar>
                        <div>Danh mục</div>
                        <NavbarComponent items={NavbarItems} isNavigate/>
                    </WrapperNavbar>
                    <WrapperSubNavbar>
                        <div>Tiện ích</div>
                        <NavbarComponent items={NavbarSubItems} isNavigate/>
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
                            />
                        )
                    })}
                </WrapperCardProduct>
                <WrapperFooter>
                    <FooterComponent span={SpanFooter} />
                </WrapperFooter>
            </Col>
        </WrapperHomePage>
    );
}

export default HomePage