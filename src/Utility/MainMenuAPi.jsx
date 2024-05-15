import axios from "axios";
const Url = "https://localhost:44310";

const FetchListMenu = async () => {
  const response = await axios.get(`${Url}/SiteMenu`, {
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
      menuSiteName: props.name,
      menuSiteUrl: props.link,
      menuSiteSort: parseInt(props.sort),
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
      menuSiteName: props.name,
      menuSiteUrl: props.link,
      menuSiteSort: parseInt(props.sort),
    },
    {
      headers: {},
    }
  );
  return response;
};

export {
  FetchListMenu,
  AddMenuItem,
  RemoveMenuItem,
  ToggelMenuItem,
  EditMenuItem,
  GetListMenuItem,
};
