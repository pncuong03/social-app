import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchListUser = async (page, size, accessToken) => {
  try {
    const response = await instance.get(
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
