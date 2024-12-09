import axios from "axios";

export const followUser = async (token: string, userId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.post(
    `${API_BASE_URL}/users/follow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
