import axios from "axios";


export const FetchPost = async (token: string, id: string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    const response = await axios.get(`${API_BASE_URL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}