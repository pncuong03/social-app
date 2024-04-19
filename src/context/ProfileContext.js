import { BASE_URL } from "../config";
import { instance } from "../utils/axios";
export const fetchUserInfo = async (accessToken) => {
  try {
    const response = await instance({
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
    const response = await instance({
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
    throw error; // Re-throw the error so it can be caught and handled by the calling function
  }
};
