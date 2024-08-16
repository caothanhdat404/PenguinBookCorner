import React from "react";
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperHomePage, WrapperSlider } from './style'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.jpg'
import slider5 from '../../assets/images/slider5.jpg'
import slider6 from '../../assets/images/slider6.jpg'

const HomePage = () => {
    return (
        <WrapperHomePage>
            <WrapperSlider>
                <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5, slider6]} />
            </WrapperSlider>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: "#fff", width: '100%', borderRadius: '4px' }}>
                <CardComponent />
            </div>
        </WrapperHomePage>
    );
}

export default HomePage