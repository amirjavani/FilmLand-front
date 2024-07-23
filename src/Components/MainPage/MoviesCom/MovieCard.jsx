import React, { useState } from "react";
import style from "./MovieCardStyle.module.css";
const MovieCard = ({ mov }) => {
  const [movie, setMovie] = useState(mov);
  
  return (
    <div className={`rounded-2xl overflow-auto h-80  sm:h-60 md:h-72 lg:h-64 xl:h-80 m-1 ${style.movie_card}`}>
      <div className={`${style.movie_card_content}`}>
        <div className={`${style.back}`}>
          <div className={`${style.back_content}`}>
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
        </div>
        <div className={`${style.front}`}>
          <div id={`${style.img}`}>
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
          <div className={`${style.front_content} justify-between`}>
            <small className="badge">{movie.title}</small>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col" style={{fontSize:'12px'}}>
              <span>سال تولید: 2008</span>
              <span>کشور:آمریکا</span>
              </div>
              <div className=" border-1 rounded-full p-1 px-2 border-orange-200 bg-slate-600 bg-opacity-50">
              {" "}
              9.0
            </div>
            </div>
            
            <div className="bg-black bg-opacity-50 p-2 rounded-lg">
              <span className="" style={{ fontSize: "12px" }}>
                خلاصه:
              </span>
              <p className={`${style.description}`} style={{ fontSize: "13px" }}>
                داستان فیلم دوم به بررسی سفر اسطوره‌ای دوک پل اتریدیز می‌پردازد.
                او با قدرت‌های روشن‌بینی خود می‌تواند بشریت را به آینده‌ای بهتر
                هدایت کند. پل در حال حاضر با چانی و فرمن متحد شده‌است تا در مسیر
                جنگ انتقام از توطئه‌گرانی قرار بگیرد که خانواده‌اش را نابود
                کرده‌اند.
              </p>
            </div>

            <div className="flex flex-row gap-2 m-1 ">
              <button
                className="btn  flex-auto rounded-3xl bg-orange-300 bg-opacity-60 hover:bg-orange-400 "
                style={{ fontSize: "11px", fontWeight: "bold" }}>
                ادامه مطلب
              </button>
              <i
                className={`${movie.bookmark?'fa-solid':'fa-regular'} fa-star p-2 rounded-full text-sky-700 bg-sky-200 bg-opacity-60 hover:bg-sky-500  hover:text-white cursor-pointer `}
                style={{ fontSize: "16px" }}
                onClick={() => setMovie(prevMov => ({ ...prevMov, bookmark: !prevMov.bookmark }))}
                >
                </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;