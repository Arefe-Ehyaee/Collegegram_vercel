import axios from "axios";

export const acceptFollow = async (token: string, userId: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.patch(
    `${API_BASE_URL}/users/follow/${userId}/request/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
