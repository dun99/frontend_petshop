import axiosClient from "./axiosClient";

const commentApi = {
  getAll: (params) => {
    const url = "/comments";
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = "/comments";
    return axiosClient.post(url, data);
  },
};

export default commentApi;
