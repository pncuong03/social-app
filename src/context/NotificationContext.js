import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchNotifications = async (page, size, accessToken) => {
  try {
    const response = await instance.get(
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

export const fetchEventNoti = async (chatId, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/event-notification?chatId=${chatId}`,
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

export const fetchEvent = async (accessToken) => {
  try {
    const response = await instance.get(`${BASE_URL}/event-notification`, {
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
