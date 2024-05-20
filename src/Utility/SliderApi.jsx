import axios from "axios";
import { Url } from "./URL";

const FetchSlides = async () => {
  const response = await axios.get(`${Url}/Slider`, {
    headers: {},
  });
  return response;
};

const GetSliderItem = async (props) => {
  const response = await axios.get(`${Url}/SiteMenu/${props.id}`, {
    headers: {},
  });
  return response;
};

const AddSlide = async (props) => {
  const response = await axios.post(
    `${Url}/Slider/Add`,
    props.formData,
    {
      headers: {},
    }
  );
  return response;
};

const RemoveSlide = async (props) => {
  console.log(props.id);
  const response = await axios.delete(`${Url}/SiteMenu/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelSlide = async (props) => {
  const response = await axios.get(`${Url}/SiteMenu/ChangeStatus/${props.id}`, {
    headers: {},
  });
  return response;
};

const EditSlide = async (props) => {
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
  FetchSlides,
  AddSlide,
  RemoveSlide,
  ToggelSlide,
  EditSlide,
  GetSliderItem,
};
