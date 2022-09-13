/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerArrow from '../BannerArrow';

const WelcomeBanner = () => {
    const listBanner = [
        {
            name: "Banner 1",
            url: "https://ap.poly.edu.vn/images/Banner-AP.png",
        },
        {
            name: "Banner 2",
            url: "https://caodang.fpt.edu.vn/wp-content/uploads/Banner-Web-Desktop_vesion-2.png",
        },
        {
            name: "Banner 3",
            url: "https://caodang.fpt.edu.vn/wp-content/uploads/1900x750-3.png",
        },
        {
            name: "Banner 4",
            url: "https://caodang.fpt.edu.vn/wp-content/uploads/1900x750-13.png",
        }
    ]

    const settings = {
      infinite: true,
      speed: 500,
      autoplay: true,
      nextArrow: <BannerArrow direction="right" onClick={() => {}}/>,
      prevArrow: <BannerArrow onClick={() => {}}/>
    };
  return (
    <div className="tw-relative tw-max-h-[600px]">
        <Slider {...settings}>
        {listBanner.map((item, index) => (
            <a href='#' key={index}>
                <img src={item.url} alt={item.name} className="tw-w-full" />
            </a>
        ))}
        </Slider>
    </div>
  )
}

export default WelcomeBanner