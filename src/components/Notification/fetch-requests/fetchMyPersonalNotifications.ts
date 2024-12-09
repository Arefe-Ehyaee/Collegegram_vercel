
import axios from "axios";


export const fetchMyPersonalNotifications = async ({pageParam = 1}, token: string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const response = await axios.get(`${API_BASE_URL}/notifications/personal`, {
        params: {
            page: pageParam,
            limit: 12,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}