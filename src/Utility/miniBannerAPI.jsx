import axios from "axios";
import { Url } from "./URL";

const FetchMiniBanner = async () => {
  const response = await axios.get(`${Url}/MiniBanner`, {
    headers: {},
  });
  return response;
};

const GetMiniBannerItem = async (props) => {
  const response = await axios.get(`${Url}/MiniBanner/${props.id}`, {
    headers: {},
  });
  return response;
};

const AddMiniBanner = async (props) => {
  const response = await axios.post(
    `${Url}/MiniBanner/Add`,
    props.formData,
    {
      headers: {},
    }
  );
  return response;
};

const RemoveMiniBanner= async (props) => {
  console.log(props.id);
  const response = await axios.delete(`${Url}/MiniBanner/${props.id}`, {
    headers: {},
  });
  return response;
};

const ToggelMiniBanner = async (props) => {
  const response = await axios.get(`${Url}/MiniBanner/ChangeStatus/${props.id}`, {
    headers: {},
  });
  return response;
};

const EditMiniBanner = async (props) => {
  const response = await axios.put(
    `${Url}/MiniBanner/Edit/${props.id}`,
    props.formData,
    {
      headers: {},
    }
  );
  return response;
};

export {
  FetchMiniBanner,
  AddMiniBanner,
  RemoveMiniBanner,
  ToggelMiniBanner,
  EditMiniBanner,
  GetMiniBannerItem,
};
