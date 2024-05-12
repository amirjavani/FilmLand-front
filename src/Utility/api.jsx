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
      name: props.name,
      sort: props.sort,
      url: props.link,
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
  const response = await axios.post(`${Url}/remove`, {
    headers: {},
    data: {
      id: props.id,
      name: props.name,
      sort: props.sort,
      url: props.link,
    },
  });
  return response;
};

const EditMenuItem = async (props) => {
  const response = await axios.put(
    `${Url}/SiteMenu/Edit/${props.id}`,
    {
      name: props.name,
      sort: props.sort,
      url: props.link,
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
