import React from 'react'
import Slider from "react-slick";
import { Image } from 'antd'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, right: '10px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, left: '10px', zIndex: '1'}}
            onClick={onClick}
        />
    );
}

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height={274} />
                )
            })}
        </Slider>
    )
}

export default SliderComponent