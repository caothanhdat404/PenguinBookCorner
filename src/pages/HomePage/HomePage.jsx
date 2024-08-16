import React from "react";
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import { WrapperHomePage, WrapperSlider } from './style'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'

const HomePage = () => {
    return (
        <WrapperHomePage>
            <WrapperSlider>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
            </WrapperSlider>
        </WrapperHomePage>
    );
}

export default HomePage