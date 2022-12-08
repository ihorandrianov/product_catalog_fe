import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/virtual';
import styles from '../styles/PhotoGalery.module.css';
import classNames from 'classnames';

type Props = {
  photos: string[];
};

export const PhotoSlider: FC<Props> = ({ photos }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const handleClick = (slideNumber: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideNumber, 500);
      setSelectedSlide(slideNumber);
    }
  };
  return (
    <div className={styles.block}>
      <div>
        <ul className={styles.buttonContainer}>
          {photos.map((photo, index) => (
            <li key={photo}>
              <button
                className={classNames(
                  styles.button,
                  index === selectedSlide ? styles.selectedButton : null,
                )}
                onClick={() => {
                  handleClick(index);
                }}
              >
                <Image
                  src={`/${photo}`}
                  alt="phone"
                  width={80}
                  height={80}
                  className={styles.img}
                  placeholder="empty"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.slider}>
        <Swiper
          className="MySwiper"
          modules={[Virtual]}
          slidesPerView={1}
          spaceBetween={50}
          width={442}
          height={442}
          ref={swiperRef}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={photo} virtualIndex={index}>
              <div className={styles.slider}>
                <Image
                  src={`/${photo}`}
                  alt="phone"
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  className={styles.img}
                  placeholder="empty"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
