import axios from "axios";
import { Url } from "./URL";

const FetchCategory = async () => {
  const response = await axios.get(`${Url}/Category`, {
    headers: {},
  });
  return response;
};

const FetchGenre = async () => {
  const response = await axios.get(`${Url}/Genre`, {
    headers: {},
  });
  return response;
};

const FetchMoviesList = async () => {
  const response = await axios.get(`${Url}/Movie`, {
    headers: {},
  });
  return response;
};

const GetOneMovie = async (props) => {
  const response = await axios.get(`${Url}/Movie/${props.id}`, {
    headers: {},
  });
  return response;
};

const AddingMovie = async ({formData}) => {
  const response = await axios.post(
    `${Url}/Movie/Add`,
    formData,
    {
      headers: {},
    }
  );
  return response;
};

const RemoveMovie = async (props) => {
  console.log(props.id);
  const response = await axios.delete(`${Url}/Movie/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelMovie = async (props) => {
  const response = await axios.get(`${Url}/Movie/ChangeStatus/${props.id}`, {
    headers: {},
  });
  return response;
};

const EditMovie = async (props) => {
  const response = await axios.put(
    `${Url}/Movie/Edit/${props.id}`,
    {
      siteMenuName: props.name,
      siteMenuUrl: props.link,
      siteMenuSort: parseInt(props.sort),
    },
    {
      headers: {},
    }
  );
  return response;
};

export {
  FetchCategory,
  FetchGenre,
  FetchMoviesList,
  AddingMovie,
  RemoveMovie,
  ToggelMovie,
  EditMovie,
  GetOneMovie,
};
