import axios from "axios";
import { Url } from "./URL";

const FetchSingleMovie = async (props) => {
    const response = await axios.get(`${Url}/Movie/${props.id}`, {
      headers: {},
    });
    return response;
};

export {
    FetchSingleMovie
};