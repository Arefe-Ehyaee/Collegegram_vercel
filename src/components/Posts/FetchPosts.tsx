import axios from "axios";

export const FetchPosts = async ({ pageParam = 1 }: { pageParam: number }, token: string, username: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.get(`${API_BASE_URL}/posts`, {
    params: {
      page: pageParam,
      limit: 9,
      username: username,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
