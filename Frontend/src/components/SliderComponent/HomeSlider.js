import React from 'react';
import Slider from "react-slick"; // ✅ Make sure this is correct
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const images = [
    "/assets/img/download1.jpeg",
    "/assets/img/trad.jpeg",
    "/assets/img/t3.jpg"
  ];

  return (
    <div className="mt-3">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
