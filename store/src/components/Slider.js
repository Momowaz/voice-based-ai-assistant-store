import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const sliderStyle = {
        width: '80%',
        height: '500px',
        margin: '0 auto',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
    };

    return (
        <div>
            <Slider {...settings}>
                <div>
                    <img src="/slider-1.jpeg" alt="Image 1" style={imageStyle} />
                </div>
            </Slider>
        </div>
    );
};

export default SimpleSlider;
