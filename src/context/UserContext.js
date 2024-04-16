import axios from "axios";
import { BASE_URL } from "../config";

export const fetchListUser = async (page, size, accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/list?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error list user:", error);
    throw error;
  }
};
