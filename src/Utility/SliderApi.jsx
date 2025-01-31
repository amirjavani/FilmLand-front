import axios from "axios";
import { Url } from "./URL";

const FetchSlides = async () => {
  const response = await axios.get(`${Url}/Slider`, {
    headers: {},
  });
  return response;
};

const GetSliderItem = async (props) => {
  const response = await axios.get(`${Url}/Slider/${props.id}`, {
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
  const response = await axios.delete(`${Url}/Slider/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelSlide = async (props) => {
  const response = await axios.get(`${Url}/Slider/ChangeStatus/${props.id}`, {
    headers: {},
  });
  return response;
};

const EditSlide = async (props) => {
  const response = await axios.put(
    `${Url}/Slider/Edit/${props.id}`,
    props.formData,
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
