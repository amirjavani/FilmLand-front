import React from 'react'
import './MovieStyle.css'

function Movie() {
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
  </div>
</>

  )
}

export default Movie
