import { BASE_URL } from "../config";
import { instance } from "../utils/axios";
export const createNewPost = async (accessToken, formData) => {
  try {
    const response = await instance.get(`${BASE_URL}/group/create-group`, {
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
    const response = await instance.get(`${BASE_URL}/group/getlistGroup`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMemberGroup = async (groupId, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/group/members?groupId=${groupId}`,
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

export const fetchAddMemberGroup = async (groupId, userIds, accessToken) => {
  try {
    const response = await instance.post(
      `${BASE_URL}/group/add-member`,
      {
        groupId: groupId,
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

export const fetchLeaveGroup = async (groupId, accessToken) => {
  try {
    const response = await instance.delete(
      `${BASE_URL}/group/leave-group?groupId=${groupId}`,
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

export const fetchDeleteMemberGroup = async (groupId, userId, accessToken) => {
  try {
    const response = await instance.delete(
      `${BASE_URL}/group-chat/delete-member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          groupId: groupId,
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
