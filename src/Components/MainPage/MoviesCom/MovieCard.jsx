import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="rounded-2xl overflow-auto m-1">
      <img className=" " src={movie.posterUrl} alt={movie.title} />
    </div>
  );
};

export default MovieCard;