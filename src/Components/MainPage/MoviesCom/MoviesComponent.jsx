import React from 'react'

import FilterNav from './FilterNav';
import MovieCard from './MovieCard';
import "./MoviesStyle.css"

const movies = [
  {
    id: 1,
    title: "پاندای کونگ فو کار ",
    description: "This is the description for film 1",
    posterUrl: "/Assets/Carts/Dune.jpg",
    bookmark: true,
  },
  {
    id: "1689c946-6552-4aa5-923f-182900a05395",
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Movie/panda4-200x300.webp",
    bookmark: false,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: false,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },

];

function MoviesComponent() {

  const fetchMovies = () => {

  }


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
            <div key={movie.id} className="movies-cart">
              <div className="movie_cart_title">
                Kung Fu Panda 4
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
