import axios from "axios";

export const request = async (method: string, data: any, param: string) => {
    const res = await axios({
        method: method,
        url: `${process.env.REACT_APP_API_URL}/${param}`,
        data: data,
        withCredentials: true,
    });
    return res.data;
};
