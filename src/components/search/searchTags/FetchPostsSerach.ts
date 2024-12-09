import axios from "axios";

export const FetchPostsSerach = async ({ pageParam = 1 }: { pageParam: number }, token: string, query:string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  if (!token || token.trim() === "" || token === "undefined" || token === "null") {
    console.warn("FetchPosts called without a valid token. Aborting request.");
    return null;
  }

  const response = await axios.get(`${API_BASE_URL}/posts/search`, {
    params: {
      page: pageParam,
      query: query,
      limit: 9,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

