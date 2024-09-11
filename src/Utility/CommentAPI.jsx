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

const AnswerComment = async (id) => {
  const response = await axios.put(`${Url}/Comment/Answer/${id}`, {
    headers: {
      "Content-Type": "application/json", // Set Content-Type to application/json
    },
  });
  return response;
};

const GetAllComment = async (filter) => {
    const response = await axios.get(`${Url}/Comment/All?filter=${filter}`, {
      headers: {},
    });
    return response;
  };
const GetAllProfanityComments = async () => {
    const response = await axios.get(`${Url}/Comment/AllProfanity`, {
      headers: {},
    });
    return response;
  };
const GetMovieComments = async (id) => {
    const response = await axios.get(`${Url}/Comment/${id}`, {
      headers: {},
    });
    return response;
  };

  const DeleteComment = async (id) => {
    const response = await axios.delete(`${Url}/Comment/${id}`, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    });
    return response;
  };
  const EditProfanity = async (id) => {
    const response = await axios.put(`${Url}/Comment/EditProfanity/${id}`, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
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
  const CheckFeeling = async (data) => {

    const response = await axios.post(`${Url2}/check_sense/`, data, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    });
    return response;
  };

  
  

export {
    AddComment,
    GetAllComment,
    CheckProfanity,
    CheckFeeling,
    GetMovieComments,
    GetAllProfanityComments,
    EditProfanity,
    DeleteComment,
    AnswerComment,
};
