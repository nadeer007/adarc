"use client"
import React from 'react';
import Slider from 'react-slick';
import productData from '../../../data.json';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BottomBanner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <div className="mb-[48px] overflow-hidden ">
      <Slider {...settings}>
        {productData?.bannerBottom.map((item, index) => (
          <div key={index} className="px-[10px] ">
            <div
              className="w-full bg-PRIMARY_GREY overflow-hidden"
            >
              <Image
                src={item.image}
                width={100}
                height={100}
                alt="banner"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
