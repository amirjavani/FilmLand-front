import React, { useState } from "react";
import style from "./MovieCardStyle.module.css";
import { useNavigate } from "react-router-dom";
import imdb from "../../../Assets/4373222_imdb_logo_logos_icon.png"
const MovieCard = ({ mov }) => {
  const [movie, setMovie] = useState(mov);
  const navigator = useNavigate();

  const continues = () => {
    navigator('/movie/' + movie.id)
  }


  return (
    <div className={`${style.movie_card}`}>

      <div className={`${style.movie_card_content}`}>
        <div className={`${style.back}`}>
          <div className={`${style.back_content}`}>
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
        </div>
        <div className={`${style.front}`}>

          <div className={`${style.front_img}`}>
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
          <div className={`${style.front_content} justify-between`}>
            <small className={`badge mt-2 text-sm ${style.front_title}`} >{movie.title}</small>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col" style={{ fontSize: '12px' }}>
                <span className={`${style.movie_cart_product_year}`}>سال تولید: 2008</span>
                <span className={`${style.movie_cart_country}`}>کشور:آمریکا</span>
              </div>

            </div>

            <div className={`bg-black bg-opacity-50 rounded-lg ${style.movie_cart_description_container}`}>
              <span className={`${style.movie_cart_summary_title}`}>
                خلاصه:
              </span>
              <p className={`${style.description}`}>
                داستان فیلم دوم به بررسی سفر اسطوره‌ای دوک پل اتریدیز می‌پردازد.
                او با قدرت‌های روشن‌بینی خود می‌تواند بشریت را به آینده‌ای بهتر
                هدایت کند. پل در حال حاضر با چانی و فرمن متحد شده‌است تا در مسیر
                جنگ انتقام از توطئه‌گرانی قرار بگیرد که خانواده‌اش را نابود
                کرده‌اند.
              </p>
            </div>

            <div className={`${style.movie_cart_bottom}`}>
              {/* <button
                onClick={() => continues()}
                className="btn  flex-auto rounded-3xl bg-orange-300 bg-opacity-60 hover:bg-orange-400 "
                style={{ fontSize: "11px", fontWeight: "bold" }}>
                ادامه مطلب
              </button> */}
              <i
                className={`${movie.bookmark ? 'fa-solid' : 'fa-regular'} fa-star p-2 rounded-full text-sky-700 bg-sky-200 bg-opacity-60 hover:bg-sky-500  hover:text-white cursor-pointer mb-2 ${style.movie_cart_bookmark}`}
                onClick={() => setMovie(prevMov => ({ ...prevMov, bookmark: !prevMov.bookmark }))}
              >
              </i>
              <div className={`${style.movie_cart_imdb_container}`}>

                <p className={`${style.movie_cart_imdb}`}>9.2</p>
                <img className={`${style.movie_cart_imdb_icon}`} src={imdb} alt="" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;