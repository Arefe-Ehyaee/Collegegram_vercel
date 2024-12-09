
import axios from "axios";


export const fetchFriendsNotificationCount = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const response = await axios.get(`${API_BASE_URL}/notifications/unseen/count/friends`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return response.data;
}