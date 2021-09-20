import axiosClient from "./axiosClient";

const revenueApi = {
  getAll: (params) => {
    const url = "/revenues";
    return axiosClient.get(url, { params });
  },
};

export default revenueApi;
