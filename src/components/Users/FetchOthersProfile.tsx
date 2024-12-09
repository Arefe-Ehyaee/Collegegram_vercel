import axios from "axios";
import { toast } from "react-toastify";

export const FetchOthersProfile = async (token: string, username: string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const response = await axios.get(`${API_BASE_URL}/users/profile?username=${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.data.message.includes("User not found")) {
        console.log("error foundddddddddd")
        toast.error("کاربر پیدا نشد")
    }

    return response.data;
};