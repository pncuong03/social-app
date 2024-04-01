import axios from "axios";
import { BASE_URL } from "../config";

export const fetchPostPublic = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/list/friends`, {
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
