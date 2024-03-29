import axios from "axios";
import { BASE_URL } from "../config";

export const fetchFriendRequests = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/friend/request/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw error;
  }
};

export const fetchListFriend = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/friend/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw error;
  }
};
