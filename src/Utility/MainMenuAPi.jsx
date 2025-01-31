import axios from "axios";
import { Url } from "./URL";

const FetchListMenu = async () => {
  const response = await axios.get(`${Url}/SiteMenu`, {
    headers: {},
  });
  return response;
};

const FetchListMenuHeader = async () => {
  const response = await axios.get(`${Url}/SiteMenu/Header`, {
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

const AddMenuItem = async (props) => {
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
  FetchListMenu,
  FetchListMenuHeader,
  AddMenuItem,
  RemoveMenuItem,
  ToggelMenuItem,
  EditMenuItem,
  GetListMenuItem,
};
