import axios from "axios";

export const DeleteFromFollowers = async (token: string, followerId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.delete(
    `${API_BASE_URL}/users/followers/${followerId}/delete`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
