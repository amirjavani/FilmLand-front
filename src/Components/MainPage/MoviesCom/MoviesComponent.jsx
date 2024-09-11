import React, { useState, useRef, useEffect } from "react";

import FilterNav from './FilterNav';
import MovieCard from './MovieCard';
import "./MoviesStyle.css";
import { FetchMovies } from "../../../Utility/MovieAPI";
import { useLocation } from 'react-router-dom';

function MoviesComponent() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const genre = queryParams.get('genre');
  

  const fetchData = async () => {
    try {
      const response = await FetchMovies(category, genre );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(movies)
  };

  

  useEffect(() => {
    fetchData();

    return () => {
    };
  }, [location.search]);


  return (
    <div className="movies-container">

      <FilterNav />
      <div className="movies-inner-container">
        <div className="movies-inner-title-container">
          <div className="short-line"></div>
          <h2 className="movies-title5">فیلم ها</h2>
        </div>
        <div className="movies-carts-container">
          {movies.map((movie) => (
            <div key={movie.movieId} className="movies-cart">
              <div className="movie_cart_title">
              {movie.movieEnglishName}
              </div>
              <MovieCard mov={movie} />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesComponent;
