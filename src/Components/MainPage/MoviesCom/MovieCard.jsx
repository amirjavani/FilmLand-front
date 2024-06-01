import React from "react";
import "./MovieCardStyle.css";
const MovieCard = ({ movie }) => {
  return (
    <div className="rounded-2xl overflow-auto h-80  sm:h-60 md:h-72 lg:h-64 xl:h-80 m-1 movie-card">
      <div className="movie-card-content">
        <div className="back">
          <div className="back-content">
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
        </div>
        <div className="front">
          <div className="img">
            <img className=" " src={movie.posterUrl} alt={movie.title} />
          </div>
          <div className="front-content">
            <small className="badge">{movie.title}</small>
            <span className="" style={{ fontSize: "12px" }}>
              خلاصه:
            </span>
            <p className=" description" style={{ fontSize: "13px"  }}>
              داستان فیلم دوم به بررسی سفر اسطوره‌ای دوک پل اتریدیز می‌پردازد.
              او با قدرت‌های روشن‌بینی خود می‌تواند بشریت را به آینده‌ای بهتر
              هدایت کند. پل در حال حاضر با چانی و فرمن متحد شده‌است تا در مسیر
              جنگ انتقام از توطئه‌گرانی قرار بگیرد که خانواده‌اش را نابود
              کرده‌اند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
