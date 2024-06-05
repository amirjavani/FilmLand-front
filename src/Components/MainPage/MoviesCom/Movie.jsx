import React, { useEffect, useRef, useState } from 'react';
import './MovieStyle.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./Movie.js"

function Movie() {
  const actors = [
    "/Assets/Actors/30148175-l_30NAMA.jpg",
    "/Assets/Actors/30148655-l_30NAMA.jpg",
    "/Assets/Actors/30148379-l_30NAMA.jpg",
    "/Assets/Actors/30200166-l_30NAMA.jpg",
    "/Assets/Actors/30205507-l_30NAMA.jpg",
    "/Assets/Actors/30418203-l_30NAMA.jpg",
    "/Assets/Actors/30424753-l_30NAMA.jpg"
  ];
  const pics = [
    "/Assets/Pictures/Kung-Fu-Panda-4-2024-img1-jpg.webp",
    "/Assets/Pictures/Kung-Fu-Panda-4-2024-img2-1-jpg.webp",
    "/Assets/Pictures/Kung-Fu-Panda-4-2024-img3-jpg.webp",
    "/Assets/Pictures/Kung-Fu-Panda-4-2024-img4-jpg.webp",
    "/Assets/Pictures/Kung-Fu-Panda-4-2024-img5-jpg.webp"
  ];

  let moreInfo, downloadContainer;
  const [showMoreInfo, setShowMoreInfo] = useState(true);
  const [showDownload, setShowDownload] = useState(false);

  const handleMoreInfoClick = (event) => {
    event.preventDefault();
    moreInfo = document.querySelector(".more-info");
    downloadContainer = document.querySelector(".downloads-container");
    moreInfo.style.display = "block"
    downloadContainer.style.display = "none"
  };

  const handleDownloadClick = (event) => {
    event.preventDefault();
    moreInfo = document.querySelector(".more-info");
    downloadContainer = document.querySelector(".downloads-container");
    moreInfo.style.display = "none"
    downloadContainer.style.display = "flex"
  };

  const btnLeftRef = useRef(null);
  const btnRightRef = useRef(null);
  const tabMenuRef = useRef(null);
  let btnLeft, btnRight, tabMenu;

  const IconVisibility = () => {
    let scrollLeftValue = (-1 * Math.ceil(tabMenu.scrollLeft));
    let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
    console.log(scrollLeftValue);
    btnRight.style.display = scrollLeftValue > 0 ? "block" : "none";
    btnLeft.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
  };

  const handleLeftClick = () => {
    // tabMenu = document.querySelector(".tab-menu");


    // console.log(tabMenu);
    tabMenu.scrollLeft -= 150;
    setTimeout(() => IconVisibility(), 50);
  };

  const handleRightClick = () => {
    tabMenu.scrollLeft += 150;
    setTimeout(() => IconVisibility(), 50);
  };

  window.onload = function () {
    btnLeft = document.querySelector(".left-btn");
    btnRight = document.querySelector(".right-btn");
    tabMenu = document.querySelector(".tab-menu");
    console.log(btnLeft);

    // btnLeft.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    // btnRight.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
  }

  window.onresize = function () {
    btnLeft.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnRight.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

    let scrollLeftValue = (-1 * Math.round(tabMenu.scrollLeft));

    btnRight.style.display = scrollLeftValue > 0 ? "block" : "none";
  }

  let activeDrag = false;


  const MouseMoveTabMenu = (drag) => {
    if (!activeDrag) return;
    tabMenu.scrollLeft -= drag.movementX;
    IconVisibility();
    tabMenu.classList.add("dragging");
  };

  const MouseUpTabMenu = () => {
    activeDrag = false;
    tabMenu.classList.remove("dragging");
  };

  const MouseDownTabMenu = () => {
    activeDrag = true;
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('دوبله');
  const [activeOption, setActiveOption] = useState('دوبله');

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMenuOpen(false);
    setActiveOption(option);
  };

  const options = ['دوبله', 'زیرنویس چسبیده', 'زبان اصلی'];

  const [menuOpen2, setMenuOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState('سانسور شده');
  const [activeOption2, setActiveOption2] = useState('سانسور شده');

  const toggleMenu2 = () => {
    setMenuOpen2(prevMenuOpen2 => !prevMenuOpen2);
  };

  const handleOptionClick2 = (option2) => {
    setSelectedOption2(option2);
    setMenuOpen2(false);
    setActiveOption2(option2);
  };

  const options2 = ['سانسور شده', 'سانسور نشده'];
  return (
    <>
      <div className="top">
        <div className="container">
          <div className="internal-container">
            <div className="img">
              <img src={'/Assets/Movie/panda4-200x300.webp'} alt="" />
            </div>
            <div className="detail">
              <div className="title">
                <h4 className='fs-5 font-bold'>
                  دانلود انیمیشن پاندای کونگ فو کار 4 Kung Fu Panda 4 2024 دوبله
                  فارسی
                </h4>
              </div>
              <div className="summary">
                <div className="summary-title">
                  <div className="line" />
                  <h3 className='font-bold fs-5'>خلاصه :</h3>
                </div>
                <div className="summary-body">
                  <p>
                    پس از اینکه پو برای تبدیل شدن به رهبر معنوی دره صلح انتخاب شد،
                    او باید یک جنگجوی اژدها را بیابد و آموزش دهد، در حالی که یک
                    جادوگر شرور قصد دارد همه شر
                  </p>
                </div>
              </div>
              <div className="interest">
                <div className="like" title="لایک">
                  <i className="fa fa-thumbs-up" aria-hidden="true" />
                  <span>1234</span>
                </div>
                <div className="interested" title="اضافه کردن به علاقه مندی ها">
                  <i className="fa fa-star" aria-hidden="true" />
                </div>
                <div className="dislike">
                  <i className="fa fa-thumbs-down" aria-hidden="true" />
                  <span>123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-menu">
        <a className='item' href="" onClick={handleMoreInfoClick} >
          <h6>اطلاعات بیشتر</h6>
          <div className='circle'></div>
        </a>
        <a className='item' href="" onClick={handleDownloadClick}>
          <h6>دانلود</h6>
          <div className='circle'></div>
        </a>
        <a className='item' href="">
          <h6>دیدگاه</h6>
          <div className='circle'></div>
        </a>
        <a className='item' href="">
          <h6>پرسش و پاسخ</h6>
          <div className='circle'></div>
        </a>
      </div>
      <div className='body-middle'>
        <h1 className='title-movie fs-4 font-bold'>دانلود انیمیشن پاندای کونگ فو کار 4 Kung Fu Panda 4 2024 دوبله فارسی</h1>
        {/* {showMoreInfo && ( */}
        <div className='more-info'>
          <div className='info'>
            <div className='info-head'>
              <h2 className='fs-3 ml-8 mr-4 font-bold'>اطلاعات</h2>
              <div className='line2'></div>
            </div>
            <div className='info-body'>
              <div className='about'>
                <div className="summary-title">
                  <div className="line" />
                  <h3 className='font-bold fs-5'>درباره :</h3>
                </div>
                <div className="summary-body">
                  <p>
                    پس از اینکه پو برای تبدیل شدن به رهبر معنوی دره صلح انتخاب شد،
                    او باید یک جنگجوی اژدها را بیابد و آموزش دهد، در حالی که یک
                    جادوگر شرور قصد دارد همه شر
                  </p>
                </div>
              </div>
              <div className='about-detail'>
                <ul>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-language" aria-hidden="true"></i>
                      <h2>زبان اصلی</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>انگلیسی</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <h2>سال انتشار</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>2024</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-flag" aria-hidden="true"></i>
                      <h2>محصول کشور</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>انگلستان</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-video-camera" aria-hidden="true"></i>
                      <h2>کارگردان</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>Julius Berg</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                      <h2>نویسنده</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>Mathieu Gompel</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-usd" aria-hidden="true"></i>
                      <h2>بودجه</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>$20,000,000</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-clock" aria-hidden="true"></i>
                      <h2>مدت زمان</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>۱ ساعت و ۳۴ دقیقه</h2>
                    </div>
                  </li>
                  <li>
                    <div className='info-item-head'>
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <h2>رده سنی</h2>
                    </div>
                    <div className='info-item-body'>
                      <h2>PG-12</h2>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='info-head'>
            <h2 className='fs-3 ml-8 mr-4 font-bold'>بازیگران</h2>
            <div className='line3'></div>
            <h2 className='fs-3 ml-8 mr-36 font-bold'>عکس ها</h2>
            <div className='line3'></div>
          </div>
          <div className='actors-and-pictures'>
            <div className='actors'>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={40}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                centerSlide="true"
                fade="true"
                grabCursor="true"
                className="slide-actor"
              >
                {actors.map((actor, index) => (

                  <SwiperSlide key={index} className="actor-cart">
                    <div className='actor-container'>
                      <img src={actor} alt={actor.split('.')[0]} />
                      <div className='actor-name'>
                        <div className='info-item-head'>
                          <h2>Dustin Hoffman</h2>
                        </div>
                        <div className='info-item-body mt-2'>
                          <h2>Shifu</h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
            <div className='pictures'>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={2}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 300,
                  modifier: 1,
                  slideShadows: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {pics.map((pic, index) => (
                  <SwiperSlide key={index} className="pic-swiper-slide">
                    <img src={pic} alt={pic.split('.')[0]} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>
        {/* )} */}
        {/* {showDownload && ( */}
        <div className='downloads-container'>
          <div className='info-head'>
            <h2 className='fs-3 ml-8 mr-4 font-bold'>دانلود</h2>
            <div className='line2'></div>
          </div>
          <div className="downloads">
            <div className="filter-download">
              <section class="main-container">
                <div class="tab-nav-bar">
                  <div class="tab-navigation">
                    <i ref={btnLeftRef} onClick={handleLeftClick} class="uil uil-angle-left left-btn"></i>
                    <i ref={btnRightRef} onClick={handleRightClick} class="uil uil-angle-right right-btn"></i>
                    <ul ref={tabMenuRef} onMouseMove={MouseMoveTabMenu} onMouseUp={MouseUpTabMenu} onMouseDown={MouseDownTabMenu} class="tab-menu">
                      <li class="tab-btn active">فصل 1</li>
                      <li class="tab-btn">فصل 2</li>
                      <li class="tab-btn">فصل 3</li>
                      <li class="tab-btn">فصل 4</li>
                      <li class="tab-btn">فصل 5</li>
                      <li class="tab-btn">فصل 6</li>
                      <li class="tab-btn">فصل 7</li>
                      <li class="tab-btn">فصل 8</li>
                      <li class="tab-btn">فصل 9</li>
                      <li class="tab-btn">فصل 10</li>
                      <li class="tab-btn">فصل 11</li>
                      <li class="tab-btn">فصل 12</li>
                    </ul>
                  </div>
                </div>
              </section>
              <div className='filter-movie'>
                <div className="dropdown">
                  <div className={`select ${menuOpen ? 'select-clicked' : ''}`} onClick={toggleMenu}>
                    <span className="selected">{selectedOption}</span>
                    <div className={`caret ${menuOpen ? 'caret-rotate' : ''}`}></div>
                  </div>
                  <ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
                    {options.map(option => (
                      <li
                        key={option}
                        className={option === activeOption ? 'active2' : ''}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown">
                  <div className={`select ${menuOpen2 ? 'select-clicked' : ''}`} onClick={toggleMenu2}>
                    <span className="selected">{selectedOption2}</span>
                    <div className={`caret ${menuOpen2 ? 'caret-rotate' : ''}`}></div>
                  </div>
                  <ul className={`menu ${menuOpen2 ? 'menu-open' : ''}`}>
                    {options2.map(option2 => (
                      <li
                        key={option2}
                        className={option2 === activeOption2 ? 'active2' : ''}
                        onClick={() => handleOptionClick2(option2)}
                      >
                        {option2}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='download-container'>
              <div className='part-movie'></div>
              <div className='download-div'>
                <div className='subtitle'></div>
                <div className='download'></div>
                <div className='download'></div>
                <div className='download'></div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>

    </>
  )
}

export default Movie
