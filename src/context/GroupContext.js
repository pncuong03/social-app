import axios from "axios";
import { BASE_URL } from "../config";
export const createNewPost = async (accessToken,formData) => {
    try {
      const response = await axios.get(`${BASE_URL}/group/create-group`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      });
  
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const getGroupLists = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/group/getlistGroup`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  export const createPostInGroup = async (accessToken, formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/post-group/post`,
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
  export const getGroupMember = async (groupId, accessToken) => {
    try {
        const response = await axios({
            method: "get",
            url: `http://192.168.1.204:8080/api/v1/group/members`,
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
export const getGroupInfo = async (groupId) => {
  try {
    const response = await axios({
        method: "get",
        url: `${BASE_URL}/group/group/infor`,
        params: {
            groupId: groupId,
        },
    });
    return response.data;
} catch (error) {
    console.error("Error:", error);
}
 };