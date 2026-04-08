'use client'

import Image from "next/image";
import styles from "./Banner.module.css";
import {} from 'swiper/element/bundle';
import 'swiper/css/bundle';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Banner() {
  return (
    <section className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={true}
      >
        <SwiperSlide>
          <div className={styles.container}>
            <Image className={styles.bannerImage} src="/assets/images/banner1.png" alt="Banner" fill />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.container}>
            <Image className={styles.bannerImage} src="/assets/images/banner1.png" alt="Banner" fill />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.container}>
            <Image className={styles.bannerImage} src="/assets/images/banner1.png" alt="Banner" fill />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}