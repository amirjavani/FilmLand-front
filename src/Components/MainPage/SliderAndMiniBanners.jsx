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
import { FetchMiniBanner } from "../../Utility/miniBannerAPI";

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
      const response = await FetchMiniBanner();
      setMinibanners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchingMinibanners();
    FetchingSlides();
    return () => { };
  }, []);

  return (
    <div className="slider-and-cart" style={{ backgroundColor: "#15202b" }}>
      <div className="slider">
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
                    <Link to={slide.sliderUrl}>
                      <img
                        src={
                          Url +
                          slide.filePath +
                          slide.fileName +
                          slide.fileExtension
                        }
                        alt={slide.sliderName}></img>
                      <div className="slide-text">
                        <h2>{slide.sliderName}</h2>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              );
            })}
        </Swiper>
      </div>

      {minibanners.length > 0 && (
        <div className="minibanners">
          <div className="horizontal-minibanner">
            {minibanners[0] && minibanners[0].miniBannerIsStatus && (
              <div className="minibanner">
                <img
                  alt={minibanners[0].sliderName}
                  src={
                    Url +
                    minibanners[0].filePath +
                    minibanners[0].fileName +
                    minibanners[0].fileExtension
                  }
                  style={{ cursor: "pointer" }}
                />
                <div className="slide-text2">
                        <h2>{minibanners[0].miniBannerName}</h2>
                      </div>
              </div>
            )}

            {minibanners[1] && minibanners[1].miniBannerIsStatus && (
              <div className="minibanner">
                <img
                  alt={minibanners[1].sliderName}
                  src={
                    Url +
                    minibanners[1].filePath +
                    minibanners[1].fileName +
                    minibanners[1].fileExtension
                  }
                  style={{ cursor: "pointer" }}
                />
                <div className="slide-text2">
                        <h2>{minibanners[1].miniBannerName}</h2>
                  </div>
              </div>
            )}
          </div>
          <div className="horizontal-minibanner2">
            {minibanners[2] && minibanners[2].miniBannerIsStatus && (
              <div className="minibanner">
                <img
                  alt={minibanners[2].sliderName}
                  src={
                    Url +
                    minibanners[2].filePath +
                    minibanners[2].fileName +
                    minibanners[2].fileExtension
                  }
                  style={{ cursor: "pointer" }}
                />
                <div className="slide-text2">
                        <h2>{minibanners[2].miniBannerName}</h2>
                  </div>
              </div>
            )}
            {minibanners[3] && minibanners[3].miniBannerIsStatus && (
              <div className="minibanner">
                <img
                  alt={minibanners[3].sliderName}
                  src={
                    Url +
                    minibanners[3].filePath +
                    minibanners[3].fileName +
                    minibanners[3].fileExtension
                  }
                  style={{ cursor: "pointer" }}
                />
                <div className="slide-text2">
                        <h2>{minibanners[3].miniBannerName}</h2>
                  </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider;
