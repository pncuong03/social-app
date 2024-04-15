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