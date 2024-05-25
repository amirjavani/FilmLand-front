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
  const [minibanners, setMinibanners] = useState([]);

  const FetchingSlides = async () => {
    try {
      const response = await FetchSlides();
      setSlides(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchingMinibanners = async () => {
    try {
      // const response = await FetchSlides();
      setMinibanners([
        { image: "/Assets/MiniBanners/Fallout-preview.jpeg" },
        { image: "/Assets/MiniBanners/luthes-preview.jpg" },
        { image: "/Assets/MiniBanners/robel-moon-preview.jpg" },
        { image: "/Assets/MiniBanners/Sentinel-Preview.jpg" },
      ]);
      console.log(minibanners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchingMinibanners();
    FetchingSlides();
    return () => {};
  }, []);

  return (
    <div className="slider-and-cart " style={{ backgroundColor: " #15202b" }}>
      <div className=" slider">
        <Swiper
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
                slide.sliderIsStatus && (
                  <SwiperSlide key={index}>
                    <Link  to={slide.sliderUrl}>
                      <img
                        src={
                          Url +
                          slide.filePath +
                          slide.fileName +
                          slide.fileExtension
                        }
                        alt={slide.sliderName}></img>
                    </Link>
                  </SwiperSlide>
                )
              );
            })}
        </Swiper>
      </div>

      {minibanners.length===4 && (
        <div className="minibanners">
          <div className="horizontal-minibanner">
            <div className="minibanner">
              <img alt="0" src={minibanners[0].image} />
            </div>
            <div className="minibanner">
              <img alt="s" src={minibanners[1].image} />
            </div>
          </div>
          <div className="horizontal-minibanner2">
            <div className="minibanner">
              <img alt="s" src={minibanners[2].image} />
            </div>
            <div className="minibanner">
              <img alt="s" src={minibanners[3].image} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;
