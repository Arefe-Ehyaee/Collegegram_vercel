import axios from "axios";

export const unfollowUser = async (token: string, userId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.delete(
    `${API_BASE_URL}/users/unfollow/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
