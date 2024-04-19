import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchDetailPost = async (postId, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/user/post/interaction?postId=${postId}`,
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

export const fetchLike = async (postId, accessToken) => {
  try {
    const response = await instance.post(
      `${BASE_URL}/user/post/interaction/like?postId=${postId}`,
      {},
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

export const fetchListLike = async (id, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/user/post/interaction/like/list?postId=${id}`,
      {},
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

export const fetchUnLike = async (id, accessToken) => {
  try {
    const response = await instance.delete(
      `${BASE_URL}/user/post/interaction/remove-like?postId=${id}`,

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

export const fetchComment = async (postId, comment, accessToken) => {
  try {
    const response = await instance.post(
      `${BASE_URL}/user/post/interaction/comment?postId=${postId}&comment=${comment}`,
      {},
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

export const fetchDeleteComment = async (commentId, accessToken) => {
  try {
    const response = await instance.delete(
      `${BASE_URL}/user/post/interaction/comment/delete?commentId=${commentId}`,
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

export const fetchShare = async (postId, content, state, accessToken) => {
  try {
    const response = await instance.post(
      `${BASE_URL}/post/share?shareId=${postId}`,
      {
        content,
        state,
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
