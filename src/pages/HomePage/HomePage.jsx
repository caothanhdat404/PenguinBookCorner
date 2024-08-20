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
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const NavbarItems = [
    {
        key: '1',
        label: 'VĂN HỌC',
    },
    {
        key: '2',
        label: 'KHOA HỌC',
    },
    {
        key: '3',
        label: 'THIẾU NHI',
    },
    {
        key: '4',
        label: 'KINH TẾ',
    },
    {
        key: '5',
        label: 'KỸ NĂNG',
    },
    {
        key: '6',
        label: 'TRUYỆN TRANH',
    },
    {
        key: '7',
        label: 'SGK/STK',
    },
    {
        key: 'grp',
        type: 'group',
        children: [
            { key: '13', label: 'VĂN PHÒNG PHẨM' },
            { type: 'divider' },
            { key: '14', label: 'KHÁC' },
        ],
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
    return (
        <WrapperHomePage>
            <Col span={4}>
                <div style={{ position: 'sticky', left: 0, top: '116px' }}>
                    <WrapperNavbar>
                        <div>Danh mục</div>
                        <NavbarComponent items={NavbarItems} />
                    </WrapperNavbar>
                    <WrapperSubNavbar>
                        <div>Tiện ích</div>
                        <NavbarComponent items={NavbarSubItems} />
                    </WrapperSubNavbar>
                </div>
            </Col>
            <Col span={20}>
                <WrapperSlider>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5, slider6]} option={0} />
                </WrapperSlider>
                <WrapperCardProduct>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperCardProduct>
                <WrapperFooter>
                    <FooterComponent span={SpanFooter} />
                </WrapperFooter>
            </Col>
        </WrapperHomePage>
    );
}

export default HomePage