import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./silder.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function Slider() {
  const imagePath = "../../Assets/Slider/Shogun-preview.jpg";

  return (
    <div className="slider-and-cart " style={{ backgroundColor: " #15202b" }}>
      <div className=" slider">
        <Swiper
          // install Swiper modules

          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          scrollbar={{ draggable: true }}>
          <SwiperSlide>
            <Link to={'/shogun'}>
              <img
                src={require("../../Assets/Slider/Shogun-preview.jpg")}
                alt="1"></img>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={require("../../Assets/Slider/Panda4-preview.jpg")}
              alt="1"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={require("../../Assets/Slider/halo-preview.jpg")}
              alt="1"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={require("../../Assets/Slider/Sentinel-Preview.jpg")}
              alt="1"></img>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="carts">
        <div className="horizontal-card">
          <div className="cart">
            <img alt="s" src="Dune-Review.jpeg" />
          </div>
          <div className="cart">
            <img alt="s" src="robel-moon-preview.jpg" />
          </div>
        </div>
        <div className="horizontal-card2">
          <div className="cart">
            <img alt="s" src="halo-preview.jpg" />
          </div>
          <div className="cart">
            <img alt="s" src="luthes-preview.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
