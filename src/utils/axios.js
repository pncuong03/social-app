import axios from "axios";

export const instance = axios.create({
  timeout: 80000, // Thời gian timeout là 80 giây (theo milliseconds)
});

// Xử lý lỗi timeout
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("Request cancelled", error.message);
    } else if (
      error.code === "ECONNABORTED" &&
      error.message.includes("timeout")
    ) {
      console.log("Request timeout", error.message);
      // Xử lý lỗi timeout ở đây
    } else {
      console.log("Request error", error.message);
      // Xử lý các loại lỗi khác nếu cần
    }
    return Promise.reject(error);
  }
);

export default instance;
