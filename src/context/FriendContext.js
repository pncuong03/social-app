import axios from "axios";
import { BASE_URL } from "../config";

export const fetchFriendInfo = async (accessToken,checkId) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/friend/friend-information`,
      params: {
        checkId: checkId
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
    const response = await axios.delete(`${BASE_URL}/friend/delete?friendId=${friendId}`,
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
export const fetchCancelfriend = async (friendId, accessToken) => { 
  try {
    const response = await axios.delete(`${BASE_URL}/friend/delete-request/user?receiverId=${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error cancel friend:", error);
    throw error;
  }
};
