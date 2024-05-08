import axios from "axios";

const FetchListMenu = async () => {
  const response = await axios.get(
    "http://localhost:5289/SiteMenu", {
    headers: {},
  });
  return response;
};
const AddMenuItem = async (props) => {
  const response = await axios.post(
    "http://localhost:5289/SiteMenu", {
    headers: {},
    body:{}
  });
  return response;
};

export { FetchListMenu ,AddMenuItem };
