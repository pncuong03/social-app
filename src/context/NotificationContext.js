import axios from "axios";
import { BASE_URL } from "../config";

export const fetchNotifications = async (page, size, accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notification?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEventNoti = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/event-notification`, {
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
