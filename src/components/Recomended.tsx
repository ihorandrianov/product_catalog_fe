import { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { trpc } from '../utils/trpc';
import { ProductCard } from './ProductCard';
import styles from '../styles/Recomended.module.css';
import typography from '../styles/Typography.module.css';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

export const Recomended = () => {
  const { data, isLoading } = trpc.products.getRecomended.useQuery();
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  const swiper = useRef<SwiperRef>(null);
  const [buttonIndicatorLeft, setButtonIndicatorLeft] = useState(true);
  const [buttonIndicatorRight, setButtonIndicatorRight] = useState(false);

  useEffect(() => {
    if (leftButton.current) {
      leftButton.current.disabled = true;
    }
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const onSlideRight = () => {
    if (swiper.current) {
      swiper.current.swiper.slideTo(
        swiper.current.swiper.activeIndex + 4,
        1000,
      );
    }
  };
  const onSlideLeft = () => {
    if (swiper.current) {
      swiper.current.swiper.slideTo(
        swiper.current.swiper.activeIndex - 4,
        1000,
      );
    }
  };

  return (
    <section className={styles.block}>
      <div className={styles.title}>
        <h1 className={typography.h2}>You may also like</h1>
        <div className={styles.buttonGroup}>
          <button
            aria-label="prev slide"
            onClick={onSlideLeft}
            ref={leftButton}
            className={styles.button}
          >
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z"
                fill={buttonIndicatorLeft ? '#89939a' : '#000'}
              />
            </svg>
          </button>
          <button
            onClick={onSlideRight}
            ref={rightButton}
            className={styles.button}
            aria-label="next button"
          >
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
                fill={buttonIndicatorRight ? '#89939a' : '#000'}
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.slider}>
        <Swiper
          ref={swiper}
          className="MySwiper"
          modules={[Virtual, Navigation]}
          slidesPerView={1}
          spaceBetween={5}
          height={442}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex === 0) {
              leftButton.current!.disabled = true;
              setButtonIndicatorLeft(true);
              return;
            }
            if (swiper.activeIndex === swiper.slides.length - 4) {
              rightButton.current!.disabled = true;
              setButtonIndicatorRight(true);
              return;
            }
            leftButton.current!.disabled = false;
            rightButton.current!.disabled = false;
            if (buttonIndicatorLeft) {
              setButtonIndicatorLeft(false);
            }
            if (buttonIndicatorRight) {
              setButtonIndicatorRight(false);
            }
          }}
        >
          {data &&
            data.map((phone, index) => (
              <SwiperSlide key={phone.phoneId} virtualIndex={index}>
                <div>
                  <ProductCard product={phone} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
