import axios from "axios";
import { Url } from "./URL";

const FetchActorsList = async () => {
  const response = await axios.get(`${Url}/actor/summary`, {
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

const AddActor = async (props) => {
  const response = await axios.post(
    `${Url}/Actor/Add`,
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
    FetchActorsList,
    AddActor,
//   RemoveSlide,
//   ToggelSlide,
//   EditSlide,
//   GetSliderItem,
};
