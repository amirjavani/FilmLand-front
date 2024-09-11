import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./cartsStyle.css";

const Carts = () => {
  const movies = [
    "/Assets/Carts/Dune.jpg",
    "/Assets/Carts/Interstellar.jpg",
    "/Assets/Carts/Joker.jpg",
    "/Assets/Carts/Forrest Gump.jpg",
    "/Assets/Carts/Lord of the rings.jpg",
    "/Assets/Carts/The godfather.jpg",
    "/Assets/Carts/Inception.jpg",
  ];

  return (
    <div className="slide-container swiper">
      <div className="head">
        <div className="short-line"></div>
        <h2 className="fs-3">فیلم ها</h2>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={4}
        loop={true}
        centerSlide="true"
        fade="true"
        grabCursor="true"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 5,
          },
        }}
        className="slide-content"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="cart">
              <div className="movie_cart_title2">
              asdsadasd
              </div>
              <img src={movie} alt={movie.split('.')[0]} />

              
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next swiper-navBtn"></div>
      <div className="swiper-button-prev swiper-navBtn"></div>
    </div>

  );
};



export default Carts;