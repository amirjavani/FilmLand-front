import axios from "axios";
import { Url } from "./URL";

const AddCardGroup = async (formData) => {
  try {
    const response = await axios.post(`${Url}/Cart/Add`, formData, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const AddCardToGroup = async (formData) => {
  try {
    const response = await axios.post(`${Url}/Cart/AddSingle`, formData, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const GetGroupCardMovies = async (filter) => {
  const response = await axios.get(`${Url}/Cart/Movies?searchQuery=${filter}`, {
    headers: {},
  });
  return response;
};

const GetGroupCardTitles = async () => {
  const response = await axios.get(`${Url}/Cart/All`, {
    headers: {},
  });
  return response;
};

const GetGroupCardsAll = async () => {
  const response = await axios.get(`${Url}/Cart/GetSingles`, {
    headers: {},
  });
  return response;
};

const DeleteGroupCard = async (id) => {
  const response = await axios.delete(`${Url}/Cart/DeleteCart/${id}`, {
    headers: {
      "Content-Type": "application/json", // Set Content-Type to application/json
    },
  });
  return response;
};
const DeleteGroupCardMovie = async (id) => {
  const response = await axios.delete(`${Url}/Cart/SingleCart/${id}`, {
    headers: {
      "Content-Type": "application/json", // Set Content-Type to application/json
    },
  });
  return response;
};

export {
  DeleteGroupCardMovie,
  DeleteGroupCard,
  AddCardGroup,
  GetGroupCardMovies,
  GetGroupCardTitles,
  AddCardToGroup,
  GetGroupCardsAll,
};
