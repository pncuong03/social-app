import axios from "axios";
import { BASE_URL } from "../config";

export const fetchUserGroup = async (groupId, accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/group-chat?groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCreate = async (name, userIds, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/group-chat`,
      {
        name: name,
        userIds: userIds,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAdd = async (name, userIds, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/group-chat`,
      {
        name: name,
        userIds: userIds,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchLeave = async (groupId, accessToken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/group-chat?groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDelete = async (groupId, accessToken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/group-chat?groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
