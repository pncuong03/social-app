import axios from "axios";
import { BASE_URL } from "../config";
export const fetchUserInfo = async (accessToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const upDateUserInfo = async (accessToken, formData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/user/change-user-information`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
