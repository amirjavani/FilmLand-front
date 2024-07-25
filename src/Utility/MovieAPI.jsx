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

const GetListMenuItem = async (props) => {
  const response = await axios.get(`${Url}/SiteMenu/${props.id}`, {
    headers: {},
  });
  return response;
};

const AddingMovie = async (props) => {
  const response = await axios.post(
    `${Url}/SiteMenu/Add`,
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

const RemoveMenuItem = async (props) => {
  console.log(props.id);
  const response = await axios.delete(`${Url}/SiteMenu/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelMenuItem = async (props) => {
  const response = await axios.get(`${Url}/SiteMenu/ChangeStatus/${props.id}`, {
    headers: {},
  });
  return response;
};

const EditMenuItem = async (props) => {
  const response = await axios.put(
    `${Url}/SiteMenu/Edit/${props.id}`,
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
  AddingMovie,
  RemoveMenuItem,
  ToggelMenuItem,
  EditMenuItem,
  GetListMenuItem,
};
