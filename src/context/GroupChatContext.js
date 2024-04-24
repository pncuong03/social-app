import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchUserGroup = async (groupId, accessToken) => {
  try {
    const response = await instance.get(
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

export const fetchGroup = async (nameGroup, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/group-chat/search?search=${nameGroup}`,
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
    const response = await instance.post(
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
    const response = await instance.post(
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

export const fetchLeave = async (chatId, accessToken) => {
  try {
    const response = await instance.delete(
      `${BASE_URL}/group-chat/leave-group?chatId=${chatId}`,
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
export const fetchDelete = async (groupChatId, userId, accessToken) => {
  try {
    const response = await instance.delete(
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
