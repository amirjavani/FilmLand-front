import axios from "axios";
import { Url, Url2 } from "./URL";

const AddComment = async (formData) => {
    try {
        const response = await axios.post(`${Url}/Comment/Add`, formData, {
            headers: {
                "Content-Type": "application/json", // Set Content-Type to application/json
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const GetAllComment = async (props) => {
    const response = await axios.get(`${Url}/Comment/All/${props.id}`, {
      headers: {},
    });
    return response;
  };

  const CheckProfanity = async (data) => {

    const response = await axios.post(`${Url2}/check_profanity/`, data, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    });
    return response;
  };
  

export {
    AddComment,
    GetAllComment,
    CheckProfanity
};
