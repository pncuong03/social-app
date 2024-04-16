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

export const fetchAdd = async (groupChatId, userIds, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/group-chat/add-new`,
      {
        groupChatId: groupChatId,
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

// export const fetchLeave = async (groupChatId, userId) => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/group-chat/leave-group`, {
//       data: {
//         groupChatId: groupChatId,
//         userId: userId,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const fetchLeave = async (groupChatId, userId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/group-chat/leave-group`,
      {
        data: { groupChatId, userId },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchDelete = async (groupChatId, userId, accessToken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/group-chat/delete-member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          groupChatId: groupChatId,
          userId: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
