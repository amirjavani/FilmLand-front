import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./silder.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { FetchSlides } from "../../Utility/SliderApi";
import { Url } from "../../Utility/URL";



function Slider() {
  const [slides, setSlides] = useState([]);

  const FetchingSlides = async () => {
    try {
      const response = await FetchSlides();
      setSlides(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchingSlides();
    return () => {};
  }, []);

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
          {slides &&
            slides.map((slide, index) => {
              return (
                <SwiperSlide>
                  <Link to={slide.sliderUrl}>
                    <img
                      src={Url+slide.filePath+slide.fileName+slide.fileExtension}
                      alt={slide.sliderName}></img>
                  </Link>
                </SwiperSlide>
              );
            })}
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
