import axios from "axios";
import { Url } from "./URL";

const FetchAllSubscription = async () => {
    const response = await axios.get(`${Url}/Subscription`, {
        headers: {},
        });
    return response;
};

const BuySubscription = async ({formData}) => {
    const response = await axios.put(`${Url}/Subscription/Buy`, formData, {
        headers: {},
        });
    return response;
};

const FetchSubscription = async (props) => {
    const response = await axios.get(`${Url}/Subscription/${props.id}`, {
        headers: {},
        });
    return response;
};

const CheckSubscription = async (props) => {
    console.log(props)
    const response = await axios.get(`${Url}/Subscription/Check/${props}`, {
        headers: {},
        });
    return response;
};

export {
    FetchAllSubscription,
    BuySubscription,
    FetchSubscription,
    CheckSubscription
};
