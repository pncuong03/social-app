import axiosClient from "./config";

const friendApi = {
  getAll: (params) => {
    const url = "/friend/request/list";
    return axiosClient.get(url, { params });
  },
};
export default friendApi;
