import axios from "axios";
import { BASE_URL } from "../config";

export const fetchFriendRequests = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/friend/request/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw error;
  }
};

export const fetchListFriend = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/friend/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw error;
  }
};

export const fetchAcceptFriend = async (id, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/friend/accept?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming friend11111:", error);
    throw error;
  }
};

export const fetchRejectFriend = async (id, accessToken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/friend/reject?senderId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming friend:", error);
    throw error;
  }
};

export const fetchAddFriend = async (id, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/friend/add?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error add friend:", error);
    throw error;
  }
};
export const fetchUnfriend = async (friendId, accessToken) => { 
  try {
    const response = await axios.delete(`http://192.168.1.204:8080/api/v1/friend/delete?friendId=${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error delete friend:", error);
    throw error;
  }
};
