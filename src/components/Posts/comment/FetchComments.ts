import axios from "axios";


export const FetchComments = async ({ pageParam = 1 }: { pageParam: number }, token: string, postId:string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`, {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}