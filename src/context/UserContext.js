import axios from "axios";
import { BASE_URL } from "../config";

export const fetchListUser = async (page, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error list user:", error);
    throw error;
  }
};

export const fetchUserChat = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error list chat:", error);
    throw error;
  }
};
