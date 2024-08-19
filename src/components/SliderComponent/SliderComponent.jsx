import React from 'react'
import Slider from "react-slick";
import { Image } from 'antd'
import { WrapperDots, WrapperDotsImage } from './style'

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
            style={{ ...style, left: '10px', zIndex: '1' }}
            onClick={onClick}
        />
    );
}

const SliderComponent = ({ arrImages, option }) => {
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

        appendDots: dots => (
            <div>
                <WrapperDots style={{ margin: "0px" }}> {dots} </WrapperDots>
            </div>
        ),
        customPaging: i => (
            <div></div>
        )
    };

    const settings2 = {
        appendDots: dots => (
            <div
                style={{
                    width: "100%",
                    bottom: "-15%",
                }}
            >
                <WrapperDotsImage> {dots} </WrapperDotsImage>
            </div>
        ),

        customPaging: function (i) {
            return (
                <a>
                    <img src={arrImages[i]} alt='' style={{ height: '80px' }} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    const settings = option === 0 ? settings1 : settings2;

    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height={330} />
                )
            })}
        </Slider>
    )
}

export default SliderComponent