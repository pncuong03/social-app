import { BASE_URL } from "../config";
import { instance } from "../utils/axios";

export const fetchUserChat = async (accessToken) => {
  try {
    const response = await instance.get(`${BASE_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error list chat:", error);
    throw error;
  }
};

export const fetchChatMessage = async (chatId, accessToken) => {
  try {
    const response = await instance.get(
      `${BASE_URL}/chat/messages?chatId=${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error message chat:", error);
    throw error;
  }
};

export const fetchSendMessage = async (accessToken, chatId, message) => {
  try {
    const response = await instance.post(
      `${BASE_URL}/message`,
      {
        chatId: chatId,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
