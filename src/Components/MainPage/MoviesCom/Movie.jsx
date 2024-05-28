import React from 'react'
import './MovieStyle.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay  } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Movie() {
  const actors = [
    "/Assets/Actors/30148175-l_30NAMA.webp",
    "/Assets/Actors/30148655-l_30NAMA.webp",
    "/Assets/Actors/30148379-l_30NAMA.webp",
    "/Assets/Actors/30200166-l_30NAMA.webp",
    "/Assets/Actors/30205507-l_30NAMA.webp",
    "/Assets/Actors/30418203-l_30NAMA.webp",
    "/Assets/Actors/30424753-l_30NAMA.webp"
  ];
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
        <a className='item' href="">
          <h6>اطلاعات بیشتر</h6>
          <div className='circle'></div>
        </a>
        <a className='item' href="">
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
        modules={[Pagination, Navigation, Autoplay ]}
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
          <SwiperSlide key={index} className="cart">
            <img src={actor} alt={actor.split('.')[0]} />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
        </div>
      </div>
    </>

  )
}

export default Movie
