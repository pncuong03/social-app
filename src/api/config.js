import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error setting up the request:", error.message);
    }
    console.log("Error config:", error.config);
    throw error;
  }
);
export default axiosClient;
