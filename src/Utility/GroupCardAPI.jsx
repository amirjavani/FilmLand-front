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

  
  

export {
    AddCardGroup,
    GetGroupCardMovies,
    GetGroupCardTitles,

};
