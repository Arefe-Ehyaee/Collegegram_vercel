import axios from "axios";

export const bookmarkPost = async (token: string, postId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
