import axios from "axios";
import { BASE_URL } from "../config";
//user/list?page=0&size=20
export const fetchListUser = async (page, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/list?${page}`, {
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
