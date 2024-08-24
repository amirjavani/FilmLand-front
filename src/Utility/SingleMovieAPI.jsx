import axios from "axios";
import { Url } from "./URL";

const FetchSingleMovie = async (props) => {
    const response = await axios.get(`${Url}/Movie/Detail/${props.id}`, {
      headers: {},
    });
    return response;
};

const FetchMovieFile = async (props) => {
  const response = await axios.get(`${Url}/Movie/MovieFile/${props.id}`, {
    headers: {},
  });
  return response;
};

export {
    FetchSingleMovie,
    FetchMovieFile
};