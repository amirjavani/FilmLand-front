import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./cartsStyle.css";
import { GetGroupCardsAll } from "../../Utility/GroupCardAPI";
import { Url } from "../../Utility/URL";

function Carts() {
  const [carts, setCarts] = useState([]);
  const prevRefs = useRef([]); // Array to store refs for prev buttons
  const nextRefs = useRef([]); // Array to store refs for next buttons
  const swiperInstances = useRef([]); // To store swiper instances
  const navigate = useNavigate(); // useNavigate for navigation

  const FetchGroupCardsAll = async () => {
    try {
      const response = await GetGroupCardsAll();
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchGroupCardsAll();
  }, []);

  useEffect(() => {
    // Update navigation elements after carts state changes
    carts.forEach((_, index) => {
      if (swiperInstances.current[index]) {
        swiperInstances.current[index].params.navigation.prevEl = prevRefs.current[index].current;
        swiperInstances.current[index].params.navigation.nextEl = nextRefs.current[index].current;
        swiperInstances.current[index].navigation.init();
        swiperInstances.current[index].navigation.update();
      }
    });
  }, [carts]);

  // Function to handle click and navigate to a new page
  const handleImageClick = (id) => {
    navigate(`/movie/${id}`); // Assuming the route uses the movie id
  };

  return (
    <div>
      {carts.map((cart, index) => {
        // Initialize refs for each swiper instance
        prevRefs.current[index] = prevRefs.current[index] || React.createRef();
        nextRefs.current[index] = nextRefs.current[index] || React.createRef();

        return (
          <div key={index} className={`slide-container swiper`}>
            <div className="head">
              <div className="short-line"></div>
              <h2>{cart.cartTitle}</h2>
            </div>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={40}
              slidesPerView={4}
              loop={true}
              grabCursor={true}
              navigation={{
                prevEl: prevRefs.current[index].current,
                nextEl: nextRefs.current[index].current,
              }}
              onSwiper={(swiper) => {
                swiperInstances.current[index] = swiper; // Save swiper instance
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
              {cart.singleCartList?.map((singleCart, singleCartIndex) => (
                <SwiperSlide key={singleCartIndex} className="cart">
                  <div className="movie_cart_title2">
                    {singleCart.movieEnglishName}
                  </div>
                  {/* Add onClick handler to the image */}
                  <img 
                    src={Url + singleCart.uploadFilePath} 
                    alt={singleCart.movieEnglishName} 
                    onClick={() => handleImageClick(singleCart.movieId)} // Navigate on click
                    style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickable
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div ref={prevRefs.current[index]} className="swiper-button-prev swiper-navBtn"></div>
            <div ref={nextRefs.current[index]} className="swiper-button-next swiper-navBtn"></div>
          </div>
        );
      })}
    </div>
  );
}

export default Carts;
