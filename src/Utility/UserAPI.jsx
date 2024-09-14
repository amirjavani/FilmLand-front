import axios from "axios";
import { Url } from "./URL";

const RegisterPost = async (props) => {
    const response = await axios.post(
        `${Url}/User/Register`,
        props.formData,
        {
            headers: {},
        }
    );
    return response;
};

const LoginPost = async (props) => {
    const response = await axios.post(
        `${Url}/User/Login`,
        props.formData,
        {
            headers: {},
        }
    );
    return response;
};

const LoginAdminPost = async (props) => {
    const response = await axios.post(
        `${Url}/User/LoginAdmin`,
        props.formData,
        {
            headers: {},
        }
    );
    return response;
};

export {
    RegisterPost,
    LoginPost,
    LoginAdminPost
};