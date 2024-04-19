import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchPostPublic = async (accessToken) => {
  try {
    const response = await instance.get(`${BASE_URL}/post/list/friends`, {
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
    const response = await instance({
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
export const getPostofMe = async (accessToken) => {
  try {
    const response = await instance({
      method: "get",
      url: `${BASE_URL}/post/list/me`,
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

export const getPostsOfUser = async (accessToken, userId) => {
  try {
    const response = await instance({
      method: "get",
      url: `${BASE_URL}/post/list/post-user`,
      params: {
        userId: userId,
      },
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
export const getPostsOfGroup = async (accessToken, groupId) => {
  try {
    const response = await instance({
      method: "get",
      url: `${BASE_URL}/post-group/get-post`,
      params: {
        groupId: groupId,
      },
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
