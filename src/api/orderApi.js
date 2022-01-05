import axiosClient from "./axiosClient";

const orderApi = {
  createOrder: (order) => {
    const url = "/orders";
    return axiosClient.post(url, order);
  },

  getListOrderByUserId: (userId) => {
    const url = `/orders/history/${userId}`;
    return axiosClient.get(url);
  },

  getAll: (params) => {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  update: (data) => {
    const url = `/orders/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
