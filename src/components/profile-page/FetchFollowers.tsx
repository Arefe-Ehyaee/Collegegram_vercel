import axios from "axios";


export const FetchFollowers = async ({pageParam = 1}, userId: string, token: string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/followers`, {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.followers;
}