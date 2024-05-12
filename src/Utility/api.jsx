import axios from "axios";
const Url = 'https://localhost:44310'


const FetchListMenu = async () => {
  const response = await axios.get(`${Url}/SiteMenu`, {
    headers: {},
  });
  return response;
};

const AddMenuItem = async (props) => {
  const response = await axios.post(`${Url}/SiteMenu/Add`,
  {
    name: props.name,
    sort: props.sort,
    url: props.link,
  },
  {
    headers: {},
  });
  return response;
};

const RemoveMenuItem = async (props) => {
  const response = await axios.post(`${Url}/remove`, {
    headers: {},
    data: {
      id: props.id,
    },
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
  const response = await axios.post("http://localhost:5289/edit", {
    headers: {},
    data: {
      id: props.id,
    },
  });
  return response;
};

export { FetchListMenu, AddMenuItem, RemoveMenuItem, ToggelMenuItem , EditMenuItem };
