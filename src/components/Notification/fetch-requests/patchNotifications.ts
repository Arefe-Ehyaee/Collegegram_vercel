import axios from "axios";

export const markNotificationsAsSeen = async (
  notificationIds: string[],
  token: string,
) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.patch(`${API_BASE_URL}/notifications/seen`, {
    notificationIds:notificationIds,
  },
{    headers: {
    Authorization: `Bearer ${token}`, 
  }});
  return response.data;
};
