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

export const fetchPostMe = async (accessToken) => {
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

export const userPost = async (accessToken, formData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/post/post`,
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
