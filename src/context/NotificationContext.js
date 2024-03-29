import axios from "axios";
import { BASE_URL } from "../config";

export const fetchNotifications = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/notification`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
