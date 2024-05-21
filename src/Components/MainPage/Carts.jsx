import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./cartsStyle.css";

// Install Swiper modules

const Carts = () => {
  return (
    <div className="cort-container bg-transparent p-10">
      <div className="slide-container">
        <div className="head text-white">
          <div className="short-line fs-3" />
          <h2 className="fs-3">فیلم ها</h2>
        </div>
        
        <Swiper
        className=""
          modules={[Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={40}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            520: {
              slidesPerView: 2,
            },
            920: {
              slidesPerView: 5,
            },
          }}>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/Dune.jpg" alt="Dune" />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/Interstellar.jpg" alt="Interstellar" />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/Joker.jpg" alt="Joker" />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/Forrest Gump.jpg" alt="Forrest Gump" />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img
              src="/Assets/Carts/Lord of the rings.jpg"
              alt="Lord of the rings"
            />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/The godfather.jpg" alt="The godfather" />
          </SwiperSlide>
          <SwiperSlide className="cart">
            <img src="/Assets/Carts/Inception.jpg" alt="Inception" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-next swiper-navBtn" />
        <div className="swiper-button-prev swiper-navBtn" />
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default Carts;
