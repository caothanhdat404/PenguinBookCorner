import React from "react";
import { Col } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import { WrapperHomePage, WrapperSlider, WrapperCardProduct, WrapperNavbar } from './style'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.jpg'
import slider5 from '../../assets/images/slider5.jpg'
import slider6 from '../../assets/images/slider6.jpg'

const HomePage = () => {
    return (
        <WrapperHomePage>
            <Col span={4}>
                <WrapperNavbar>
                    <NavbarComponent />
                </WrapperNavbar>
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
            </Col>
        </WrapperHomePage>
    );
}

export default HomePage