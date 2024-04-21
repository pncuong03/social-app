import axios from "axios";

export const instance = axios.create({
  timeout: 80000,
});

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
    } else {
      console.log("Request error", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
