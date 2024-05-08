import axios from "axios";

const FetchListMenu = async () => {
  const response = await axios.get(
    "http://localhost:5289/SiteMenu", {
    headers: {},
  });
  return response;
};

export { FetchListMenu };
