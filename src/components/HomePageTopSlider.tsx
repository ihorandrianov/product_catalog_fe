import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import tss from '../styles/HomePageTopSlider.module.css'; //tss is top slider styles

import photo1 from '../../public/img/top-slider-photo-1.jpg';
import photo2 from '../../public/img/top-slider-photo-2.jpg';
import photo3 from '../../public/img/top-slider-photo-3.jpg';

export const HomePageTopSlider = () => {
  return (
    <div className={classNames(tss.promoSlider)}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        navigation
        loop
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={16}
        pagination={{
          clickable: true,
          el: `${tss.swiperCustomPagination}`,
        }}
      >
        <SwiperSlide>
          <Image
            className={classNames(tss.promoSlider__image)}
            src={photo1}
            alt="IPhone 14 Pro Max"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className={classNames(tss.promoSlider__image)}
            src={photo2}
            alt="IPhone 12 Pro Max"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className={classNames(tss.promoSlider__image)}
            src={photo3}
            alt="IPhone 12 Pro Max Navy"
          />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-custom-pagination" />
    </div>
  );
};