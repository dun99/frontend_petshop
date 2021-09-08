import axiosClient from "./axiosClient";

const orderApi = {
  createOrder: (order) => {
    const url = "/orders";
    return axiosClient.post(url, order);
  },

  getListOrderByUserId: (params) => {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },
};

export default orderApi;
