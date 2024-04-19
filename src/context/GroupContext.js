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

export const getGroupLists = async () => {
  try {
    const response = await instance.get(`${BASE_URL}/group/getlistGroup`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createPostInGroup = async (accessToken, formData) => {
  try {
    const response = await instance({
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
    const response = await instance({
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
    const response = await instance({
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
