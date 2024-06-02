import React from "react";
import "./MoviesStyle.css";
import MovieCard from "./MovieCard";
import FilterNav from "./FilterNav";

const movie = [
  {
    id: 1,
    title: "Film Title 1",
    description: "This is the description for film 1",
    posterUrl: "/Assets/Carts/Dune.jpg",
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
    bookmark: false,
  },
  {
    id: 2,
    title: "Film Title 2",
    description: "This is the description for film 2",
    posterUrl: "/Assets/Carts/Forrest Gump.jpg",
    bookmark: true,
  },
  // Add more film objects here
];

function MoviesComponent() {
  return (
    <div className="mt-20 text-white">
      <FilterNav></FilterNav>
      <div className="pr-5 head">
        <div className="short-line"></div>
        <h2 className="fs-3">فیلم ها</h2>
      </div>
      <div className="container xl:px-25 lg:px-20 md:px-15 sm:px-5 ">
        <div className="flex flex-wrap -mx-4">
          {movie.map((movie) => (
            <div
              key={movie.id}
              className="w-1/2  sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4">
              <MovieCard mov={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesComponent;
